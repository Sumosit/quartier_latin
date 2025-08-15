import {CommonModule} from '@angular/common';
import {
  Component, EventEmitter, Input, Output, ViewChild, ElementRef,
  ChangeDetectionStrategy, Optional, Self
} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';

type ErrMap =
  Partial<Record<'required'|'email'|'minlength'|'maxlength'|'pattern'|'min'|'max'|'_' /*fallback*/, string | ((e:any)=>string)>>;

@Component({
  selector: 'app-ui-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-input.component.html',
  styleUrl: './ui-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiInputComponent implements ControlValueAccessor {
  constructor(@Optional() @Self() public ngControl: NgControl | null) {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  @Input() placeholder = '';
  @Input() type: 'text'|'email'|'tel'|'password'|'number' = 'text';
  @Input() autocomplete: string | null = null;
  @Input() inputmode: 'text'|'email'|'tel'|'numeric'|'decimal'|'search'|'url'|'none' = 'text';
  @Input() maxlength?: number;
  @Input() readonly = false;
  @Input() disabled = false;
  @Input() name?: string;
  @Input() id?: string;
  /** Позволяет переопределить тексты ошибок */
  @Input() errorMessages: ErrMap | null = null;

  private _value = '';
  @Input() get value(): string { return this._value; }
  set value(v: string) { this._value = v ?? ''; }
  @Output() valueChange = new EventEmitter<string>();

  @ViewChild('inp', { static: true }) inputRef!: ElementRef<HTMLInputElement>;

  // CVA
  onChange: (v: any) => void = () => {};
  onTouched: () => void = () => {};
  writeValue(v: any): void { this._value = v ?? ''; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  handleInput(ev: Event) {
    const v = (ev.target as HTMLInputElement).value;
    this._value = v;
    this.onChange(v);
    this.valueChange.emit(v);
  }

  // Состояния
  get invalid(): boolean {
    const c = this.ngControl;
    const hasErrors = !!c?.errors && Object.keys(c.errors!).length > 0;
    return !!(hasErrors && (c?.touched || c?.dirty));
  }

  get isDirty(): boolean {
    return !!this.ngControl?.dirty;
  }

  // Текст ошибки
  get errorText(): string | null {
    const errs = this.ngControl?.errors;
    if (!errs) return null;

    const map: ErrMap = {
      required: 'Обязательное поле',
      email: 'Некорректный email',
      minlength: (e:any) => `Минимум ${e.requiredLength} символов (сейчас ${e.actualLength})`,
      maxlength: (e:any) => `Максимум ${e.requiredLength} символов (сейчас ${e.actualLength})`,
      pattern: 'Неверный формат',
      min: (e:any) => `Значение не меньше ${e.min}`,
      max: (e:any) => `Значение не больше ${e.max}`,
      ...(this.errorMessages ?? {})
    };

    for (const key of Object.keys(errs)) {
      const msg = map[key as keyof ErrMap];
      if (typeof msg === 'function') return msg(errs[key]);
      if (typeof msg === 'string') return msg;
    }
    const fb = map['_'];
    return typeof fb === 'function' ? fb(errs) : (fb ?? 'Проверьте поле');
  }

  focus() { this.inputRef?.nativeElement.focus(); }
}
