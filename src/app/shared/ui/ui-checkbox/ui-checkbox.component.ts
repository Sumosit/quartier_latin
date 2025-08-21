import {
  Component, Input, Output, EventEmitter, forwardRef,
  ViewChild, ElementRef, AfterViewInit, ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {SvgIconComponent} from 'angular-svg-icon';

let nextId = 0;

@Component({
  selector: 'app-ui-checkbox',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './ui-checkbox.component.html',
  styleUrls: ['./ui-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UiCheckboxComponent),
    multi: true
  }]
})
export class UiCheckboxComponent implements ControlValueAccessor, AfterViewInit {
  @Input() id = `ui-checkbox-${++nextId}`;
  @Input() label?: string;
  @Input() hint?: string;
  @Input() name?: string;

  /** Значения, которые будут возвращаться наружу (по умолчанию boolean). */
  @Input() value: any = true;
  @Input() uncheckedValue: any = false;

  @Input() disabled = false;
  @Input() required = false;
  @Input() indeterminate = false; // для "третьего" состояния
  @Input() ariaDescribedBy?: string;

  /** Для использования без форм: [(checked)] */
  @Output() checkedChange = new EventEmitter<boolean>();
  /** Универсальное событие изменения */
  @Output() change = new EventEmitter<boolean>();

  @ViewChild('inputEl', { static: true }) inputEl!: ElementRef<HTMLInputElement>;

  private _checked = false;
  get checked() { return this._checked; }
  @Input() set checked(v: boolean) {
    this._checked = !!v;
    this.updateIndeterminate();
  }

  // ---- CVA ----
  private onChangeCb: (_: any) => void = () => {};
  private onTouchedCb: () => void = () => {};

  writeValue(value: any): void {
    // если пришло не boolean — считаем "checked", когда value строго равно this.value
    this._checked = (value === true || value === this.value);
    this.updateIndeterminate();
  }
  registerOnChange(fn: any): void { this.onChangeCb = fn; }
  registerOnTouched(fn: any): void { this.onTouchedCb = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  ngAfterViewInit() { this.updateIndeterminate(); }

  // ---- UI ----
  toggle(ev?: Event) {
    if (this.disabled) return;
    this._checked = !this._checked;
    this.indeterminate = false; // пользователь кликнул — снимаем неопределённость
    this.updateIndeterminate();
    const model = this.modelValue();
    this.onChangeCb(model);
    this.checkedChange.emit(this._checked);
    this.change.emit(this._checked);
    ev?.stopPropagation();
  }

  handleInputChange(e: Event) {
    this._checked = (e.target as HTMLInputElement).checked;
    this.indeterminate = false;
    this.updateIndeterminate();
    const model = this.modelValue();
    this.onChangeCb(model);
    this.checkedChange.emit(this._checked);
    this.change.emit(this._checked);
  }

  handleBlur() { this.onTouchedCb(); }

  private modelValue() {
    // если значения по умолчанию — возвращаем boolean
    return (this.value === true && this.uncheckedValue === false)
      ? this._checked
      : (this._checked ? this.value : this.uncheckedValue);
  }

  private updateIndeterminate() {
    if (this.inputEl) {
      this.inputEl.nativeElement.indeterminate = this.indeterminate && !this._checked;
    }
  }
}
