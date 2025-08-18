import {Component} from '@angular/core';
import {ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import {UiBtnTextIconComponent} from '../../../../shared/ui/ui-btn-text-icon/ui-btn-text-icon.component';
import {UiInputDropdownComponent} from '../../../../shared/ui/ui-dropdown/ui-dropdown.component';
import {UiInputComponent} from '../../../../shared/ui/ui-input/ui-input.component';
import {FormConsulationComponent} from '../../../../shared/form-consulation/form-consulation.component';

@Component({
  selector: 'app-bid',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UiBtnTextIconComponent,
    FormConsulationComponent
  ],
  templateUrl: './bid.component.html',
  styleUrl: './bid.component.scss'
})
export class BidComponent {

}
