import { Component } from '@angular/core';
import {UiBtnTextIconComponent} from '../../../../shared/ui/ui-btn-text-icon/ui-btn-text-icon.component';
import {ModalService} from '../../../../shared/modal-field/modal.service';

@Component({
  selector: 'app-order-help',
  imports: [
    UiBtnTextIconComponent
  ],
  templateUrl: './order-help.component.html',
  styleUrl: './order-help.component.scss'
})
export class OrderHelpComponent {

  constructor(protected modalService: ModalService) {
  }
}
