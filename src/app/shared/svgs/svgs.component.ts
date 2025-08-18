import {Component, Input} from '@angular/core';

export type Icons = '' |
  'arrow-right-big'     |
  'arrow-right'     |
  'arrow-right-medium'     |
  'arrow-right-small'     |
  'arrow-left'     |
  'cross'     |
  'cross-small'     |
  'plus'      |
  'plus-small'      |
  'menu'      |
  'telegram'  |
  'vk'        |
  'youtube'   |
  'instagram' |
  'geo'       |
  'whatsapp'  |
  'mail'      |
  'phone'

@Component({
  selector: 'app-svgs',
  standalone: true,
  imports: [],
  templateUrl: './svgs.component.html',
  styleUrl: './svgs.component.scss'
})
export class SvgsComponent {
  @Input() icon: Icons | string = '';
}
