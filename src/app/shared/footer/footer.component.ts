import {Component} from '@angular/core';
import {UiBtnTextIconComponent} from '../ui/ui-btn-text-icon/ui-btn-text-icon.component';
import {SvgsComponent} from '../svgs/svgs.component';
import {ModalService} from '../modal-field/modal.service';
import {SvgIconComponent} from 'angular-svg-icon';

@Component({
  selector: 'app-footer',
  imports: [
    UiBtnTextIconComponent,
    SvgsComponent,
    SvgIconComponent
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true
})
export class FooterComponent {

  constructor(protected modalService: ModalService) {
  }
}
