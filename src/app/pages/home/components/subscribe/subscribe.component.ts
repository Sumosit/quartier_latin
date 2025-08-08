import { Component } from '@angular/core';
import {UiBtnTextIconComponent} from '../../../../shared/ui/ui-btn-text-icon/ui-btn-text-icon.component';
import {UiBtnIconComponent} from '../../../../shared/ui/ui-btn-icon/ui-btn-icon.component';

@Component({
  selector: 'app-subscribe',
  imports: [
    UiBtnTextIconComponent,
    UiBtnIconComponent
  ],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.scss'
})
export class SubscribeComponent {

}
