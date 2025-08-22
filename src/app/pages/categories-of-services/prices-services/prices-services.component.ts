import { Component } from '@angular/core';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {UiCheckboxComponent} from '../../../shared/ui/ui-checkbox/ui-checkbox.component';
import {UiBtnTextIconComponent} from '../../../shared/ui/ui-btn-text-icon/ui-btn-text-icon.component';
import {OneLineAlignDirective} from '../../../shared/directives/one-line-align.directive';

export interface AdaptationPackage {
  key: 'econom' | 'standard' | 'premium';
  name: string;
  priceEUR: number;
  hours: number;
  badge?: string;        // напр. "Самый популярный"
  features: string[];
  cta?: string;          // "Заказать"
  highlighted?: boolean;          // "Заказать"
}

// базовые списки (если надо переиспользовать)
export const ECONOM_FEATURES: string[] = [
  'Оказание информационной поддержки по всем вопросам в течение первого года пребывания во Франции',
  'Открытие счёта во французском банке',
  'Открытие счёта в онлайн-банке',
  'Приобретение сим-карты',
  'Оформление проездного',
];

export const STANDARD_FEATURES: string[] = [
  'Пакет «Эконом»',
  'Подключение электричества',
  'Подключение домашнего интернета / TV',
  'Оформление CVEC',
  'Оформление дополнительной медицинской страховки',
  'Первый визит к врачу',
  'Оформление субсидий CAF',
  'Подача налоговой декларации',
  'Продление студенческих документов',
];

export const PREMIUM_FEATURES: string[] = [
  'Пакет «Эконом+Стандарт»',
  'Последующие визиты к врачу',
  'Заверенный перевод документов (аттестат, последний полученный диплом и приложение к нему, свидетельство о рождении)',
  'Общение с администрацией учебного заведения, решение всех организационных вопросов',
  'Замена национального водительского удостоверения на французское',
  'Получение нового загранпаспорта',
  'Другие услуги по запросу',
];

export const PACKAGES: AdaptationPackage[] = [
  {
    key: 'econom',
    name: 'Эконом',
    priceEUR: 1000,
    hours: 20,
    features: ECONOM_FEATURES,
    cta: 'Заказать',
  },
  {
    key: 'standard',
    name: 'Стандарт',
    priceEUR: 2000,
    hours: 45,
    badge: 'Самый популярный',
    features: STANDARD_FEATURES,
    cta: 'Заказать',
    highlighted: true
  },
  {
    key: 'premium',
    name: 'Премиум',
    priceEUR: 4000,
    hours: 100,
    features: PREMIUM_FEATURES,
    cta: 'Заказать',
  },
];

@Component({
  selector: 'app-prices-services',
  imports: [
    DecimalPipe,
    NgForOf,
    NgIf,
    UiCheckboxComponent,
    UiBtnTextIconComponent,
    OneLineAlignDirective
  ],
  templateUrl: './prices-services.component.html',
  styleUrl: './prices-services.component.scss'
})
export class PricesServicesComponent {
  packages = PACKAGES;
}
