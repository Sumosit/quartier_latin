import {
  Component, Input, Output, EventEmitter, forwardRef, ViewChild, ElementRef,
  HostListener, ChangeDetectionStrategy
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export type DropdownOption = string | { label: string; value: any };

@Component({
  selector: 'app-ui-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-dropdown.component.html',
  styleUrls: ['./ui-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UiInputDropdownComponent),
    multi: true
  }]
})
export class UiInputDropdownComponent implements ControlValueAccessor {
  @Input() options: DropdownOption[] = [];
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() panelMaxHeight = 260; // px
  @Input() noClear = false;      // если true — пункт "Очистить" не показываем

  @Output() valueChange = new EventEmitter<any>();

  @ViewChild('root', { static: true }) rootRef!: ElementRef<HTMLElement>;

  isOpen = false;
  focusedIndex = -1;
  private _value: any = null;

  get value() { return this._value; }
  set value(v: any) {
    this._value = v;
    this.onChange(v);
    this.valueChange.emit(v);
  }

  // ===== CVA =====
  onChange: (v: any) => void = () => {};
  onTouched: () => void = () => {};
  writeValue(v: any): void { this._value = v; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean) { this.disabled = isDisabled; }

  // ===== Helpers =====
  labelOf(opt: DropdownOption): string {
    return typeof opt === 'string' ? opt : opt.label;
  }
  valueOf(opt: DropdownOption): any {
    return typeof opt === 'string' ? opt : opt.value;
  }
  labelForValue(v: any): string | null {
    const hit = this.options.find(o => this.valueOf(o) === v);
    return hit ? this.labelOf(hit) : null;
  }

  toggle(): void {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      const idx = this.options.findIndex(o => this.valueOf(o) === this.value);
      this.focusedIndex = idx >= 0 ? idx : 0;
    }
  }
  close(): void { this.isOpen = false; this.onTouched(); }

  select(opt: DropdownOption): void {
    this.value = this.valueOf(opt);
    this.close();
  }
  clear(): void {
    this.value = null;
    this.close();
  }

  // клики вне компонента
  @HostListener('document:click', ['$event'])
  onDocumentClick(ev: MouseEvent) {
    if (!this.isOpen) return;
    const root = this.rootRef?.nativeElement;
    if (root && !root.contains(ev.target as Node)) this.close();
  }

  // клавиатура
  @HostListener('keydown', ['$event'])
  onKey(ev: KeyboardEvent) {
    if (this.disabled) return;

    // когда закрыт — Enter/Space/ArrowDown открывают
    if (!this.isOpen && (ev.key === 'Enter' || ev.key === ' ' || ev.key === 'ArrowDown')) {
      ev.preventDefault();
      this.toggle();
      return;
    }

    if (!this.isOpen) return;

    switch (ev.key) {
      case 'Escape':
        ev.preventDefault();
        this.close();
        break;
      case 'ArrowDown':
        ev.preventDefault();
        this.focusedIndex = Math.min(this.focusedIndex + 1, this.options.length - 1);
        break;
      case 'ArrowUp':
        ev.preventDefault();
        this.focusedIndex = Math.max(this.focusedIndex - 1, 0);
        break;
      case 'Enter':
        ev.preventDefault();
        if (this.focusedIndex >= 0) this.select(this.options[this.focusedIndex]);
        break;
      case 'Tab':
        this.close();
        break;
    }
  }
}
