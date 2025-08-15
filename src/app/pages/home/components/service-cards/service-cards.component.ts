import { Component } from '@angular/core';
import {UiBtnTextIconComponent} from '../../../../shared/ui/ui-btn-text-icon/ui-btn-text-icon.component';
import {RouterLink} from '@angular/router';

interface ServiceCard {
  id: number;
  title?: string;
  titles?: string[];
  type: 'type-default' | 'type-text' | 'type-btn';
  description?: string;
  imgUrl?: string;
  backgroundImage?: string;
  backgroundPosition?: string;
  buttonText?: string;
  link?: string;
}

@Component({
  selector: 'app-service-cards',
  imports: [
    UiBtnTextIconComponent,
    RouterLink
  ],
  templateUrl: './service-cards.component.html',
  styleUrl: './service-cards.component.scss'
})
export class ServiceCardsComponent {
  serviceCards: ServiceCard[] = [
    {
      id: 1,
      type: 'type-default',
      title: 'Пакеты по поступлению в ВУЗ',
      backgroundImage: 'assets/images/service_card_1.png',
      backgroundPosition: '0%',
      buttonText: 'Подробнее',
      link: '/services/university'
    },
    {
      id: 2,
      type: 'type-text',
      imgUrl: 'assets/images/service_card_text_1.png',
      link: '/services/languages'
    },
    {
      id: 3,
      type: 'type-default',
      title: 'Языковые курсы',
      backgroundImage: 'assets/images/service_card_2.png',
      backgroundPosition: '72%',
      buttonText: 'Подробнее',
      link: '/services/visa'
    },
    {
      id: 4,
      type: 'type-default',
      title: 'Визовая поддержка',
      backgroundImage: 'assets/images/service_card_3.png',
      backgroundPosition: '0%',
      buttonText: 'Подробнее',
      link: '/services/housing'
    },
    {
      id: 5,
      type: 'type-default',
      title: 'Поиск жилья',
      backgroundImage: 'assets/images/service_card_4.png',
      backgroundPosition: 'center bottom',
      buttonText: 'Подробнее',
      link: '/services/internship'
    },
    {
      id: 6,
      type: 'type-btn',
      buttonText: 'Показать все услуги',
      link: '/services/support'
    }
  ];
}
