import { Component } from '@angular/core';
import {UiBtnTextIconComponent} from '../../../../shared/ui/ui-btn-text-icon/ui-btn-text-icon.component';
import {UiBtnIconComponent} from '../../../../shared/ui/ui-btn-icon/ui-btn-icon.component';
import {SvgIconComponent} from 'angular-svg-icon';

@Component({
  selector: 'app-subscribe',
  imports: [
    UiBtnTextIconComponent,
    UiBtnIconComponent,
    SvgIconComponent
  ],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.scss'
})
export class SubscribeComponent {

}
