import {Component, Input} from '@angular/core';
import {Icons, SvgsComponent} from '../../svgs/svgs.component';

@Component({
  selector: 'app-ui-btn-icon',
  imports: [
    SvgsComponent
  ],
  templateUrl: './ui-btn-icon.component.html',
  styleUrl: './ui-btn-icon.component.scss'
})
export class UiBtnIconComponent {
  @Input() btnStyle: string | 'style-1' | 'style-2'| 'style-3' = 'style-1'
  @Input() btnIcon: Icons = ''
}
