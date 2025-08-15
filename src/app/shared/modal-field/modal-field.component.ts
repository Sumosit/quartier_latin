import { Component } from '@angular/core';
import {ModalService} from './modal.service';
import {FormConsulationComponent} from '../form-consulation/form-consulation.component';

@Component({
  selector: 'app-modal-field',
  imports: [
    FormConsulationComponent
  ],
  templateUrl: './modal-field.component.html',
  styleUrl: './modal-field.component.scss',
})
export class ModalFieldComponent {

  constructor(protected modalService: ModalService) {
  }

  protected readonly event = event;
}
