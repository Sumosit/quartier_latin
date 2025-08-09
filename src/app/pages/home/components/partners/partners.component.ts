import {Component} from '@angular/core';
import {UiBtnTextIconComponent} from '../../../../shared/ui/ui-btn-text-icon/ui-btn-text-icon.component';

export interface Partner {
  height: string,
  url: string
}

@Component({
  selector: 'app-partners',
  imports: [
    UiBtnTextIconComponent
  ],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss'
})
export class PartnersComponent {
  partners: Partner[] = [
    {
      height: '105',
      url: 'assets/images/partners_1.png',
    },
    {
      height: '63',
      url: 'assets/images/partners_2.png',
    },
    {
      height: '63',
      url: 'assets/images/partners_3.png',
    },
    {
      height: '63',
      url: 'assets/images/partners_5.png',
    },
    {
      height: '73',
      url: 'assets/images/partners_6.png',
    },
    {
      height: '83',
      url: 'assets/images/partners_4.png',
    },
  ]
}
