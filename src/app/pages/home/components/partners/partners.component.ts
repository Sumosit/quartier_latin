import {Component} from '@angular/core';

export interface Partner {
  height: string,
  url: string
}

@Component({
  selector: 'app-partners',
  imports: [],
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
