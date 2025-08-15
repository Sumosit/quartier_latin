import {Component, Input} from '@angular/core';

export type Icons = '' |
  'arrow-right'     |
  'arrow-left'     |
  'cross'     |
  'plus'      |
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
  @Input() icon: Icons = '';
}
