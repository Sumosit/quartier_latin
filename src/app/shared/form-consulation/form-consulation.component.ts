import {Component} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UiBtnTextIconComponent} from '../ui/ui-btn-text-icon/ui-btn-text-icon.component';
import {UiInputComponent} from '../ui/ui-input/ui-input.component';
import {UiInputDropdownComponent} from '../ui/ui-dropdown/ui-dropdown.component';

const PHONE_RX = /^[+\d()\s-]{6,20}$/;
const NAME_RX = /^[\p{L}\s.'-]{2,}$/u;

@Component({
  selector: 'app-form-consulation',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    UiBtnTextIconComponent,
    UiInputComponent,
    UiInputDropdownComponent
  ],
  templateUrl: './form-consulation.component.html',
  styleUrl: './form-consulation.component.scss'
})
export class FormConsulationComponent {
  form: any;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      contactMethod: [null as 'Телефон' | 'Email' | 'Telegram' | null, Validators.required],
      fullName: ['', [Validators.required, Validators.pattern(NAME_RX), Validators.maxLength(80)]],
      phone: ['', []],
      email: ['', []],
    });

    // валидаторы под выбранный способ связи
    this.form.get('contactMethod')!.valueChanges.subscribe((m: any) => this.applyContactValidators(m));
    this.applyContactValidators(this.form.get('contactMethod')!.value);
  }

  private applyContactValidators(method: any) {
    const phone = this.form.get('phone')!;
    const email = this.form.get('email')!;
    phone.clearValidators();
    email.clearValidators();

    if (method === 'Телефон') {
      phone.setValidators([Validators.required, Validators.pattern(PHONE_RX)]);
      email.setValidators([Validators.email]);
    } else if (method === 'Email') {
      email.setValidators([Validators.required, Validators.email]);
      phone.setValidators([Validators.pattern(PHONE_RX)]);
    } else {
      // Telegram — оба не обязательны, но проверяем формат если заполнены
      phone.setValidators([Validators.pattern(PHONE_RX)]);
      email.setValidators([Validators.email]);
    }
    phone.updateValueAndValidity({emitEvent: false});
    email.updateValueAndValidity({emitEvent: false});
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const dto = this.form.value; // отправляй куда нужно
    console.log('bid submit', dto);
  }
}
