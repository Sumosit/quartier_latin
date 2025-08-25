import {Component, Input} from '@angular/core';
import {Icons, SvgsComponent} from '../../svgs/svgs.component';
import {SvgIconComponent} from 'angular-svg-icon';

@Component({
  selector: 'app-ui-btn-text-icon',
  imports: [
    SvgIconComponent
  ],
  templateUrl: './ui-btn-text-icon.component.html',
  styleUrl: './ui-btn-text-icon.component.scss',
  standalone: true
})
export class UiBtnTextIconComponent {
  @Input() btnText: string = ''
  @Input() btnStyle: 'style-1' | 'style-2' | 'style-3' | 'style-header' = 'style-1'
  @Input() btnOrder: 'default' | 'row-reverse' = 'default'
  @Input() btnIcon: Icons = ''
}
