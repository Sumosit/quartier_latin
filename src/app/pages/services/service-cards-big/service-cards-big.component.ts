import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UiBtnTextIconComponent } from '../../../shared/ui/ui-btn-text-icon/ui-btn-text-icon.component';
import {UiBtnIconComponent} from '../../../shared/ui/ui-btn-icon/ui-btn-icon.component';

type ServiceCard = {
  title: string;
  desc?: string;
  link: string;           // routerLink
  bg: string;             // url('...')
  bgPos?: string;
  tags: string[];
};

@Component({
  selector: 'app-service-cards-big',
  standalone: true,
  imports: [UiBtnTextIconComponent, RouterLink, UiBtnIconComponent],
  templateUrl: './service-cards-big.component.html',
  styleUrl: './service-cards-big.component.scss'
})
export class ServiceCardsBigComponent {
  services: ServiceCard[] = [
    {
      title: 'Образование',
      desc: 'Латинский Квартал помогает выбрать университет и успешно поступить в вузы Франции и других стран Европы\n',
      link: '/services/categories-of-services',
      bg: 'assets/images/service_card_1.png',
      bgPos: 'right center',
      tags: ['Пакеты услуг по поступлению в вуз', 'Заверенный перевод документов', 'Помощь в составлении резюме', 'Подбор и запись на стипендию']
    },
    {
      title: 'Изучение языка',
      desc: 'Подберём идеальные языковые курсы, стажировку или индивидуальные занятия',
      link: '/services/categories-of-services',
      bg: 'assets/images/service_card_2.png',
      tags: ['Языковые школы', 'Французский в университете', 'Профессиональные стажировки', 'Индивидуальные занятия']
    },
    {
      title: 'Визовая поддержка',
      desc: 'Латинский Квартал сопровождает оформление студенческой визы, делая процесс лёгким и успешным\n' +
        'Пакеты получения студенческой визы',
      link: '/services/categories-of-services',
      bg: 'assets/images/service_card_5.png',
      tags: ['Пакеты получения студенческой визы', 'Поиск опекуна для несовершеннолетних', 'Cоставлении сопроводительных писем', 'Проверка документов перед подачей']
    },
    {
      title: 'Аренда жилья',
      desc: 'Подбираем и проверяем жильё для комфортного проживания во Франции',
      link: '/services/categories-of-services',
      bg: 'assets/images/service_card_4.png',
      tags: ['Студенческие резиденции', 'Аренда квартир', 'Поиск гаранта во Франции', 'Проживание в семьях', 'Оформление проживания']
    },
    {
      title: 'Адаптация на месте',
      desc: 'Решаем бытовые задачи за рубежом, облегчая Вашу адаптацию',
      link: '/services/categories-of-services',
      bg: 'assets/images/service_card_6.png',
      tags: ['Получение медицинской страховки', 'Налоговая декларация', 'Открытие банковского счёта', 'Первый визит к врачу']
    }
  ];
}
