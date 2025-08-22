import { Component } from '@angular/core';
import {HeroComponent} from './components/hero/hero.component';
import {StatCard, StatsComponent} from './components/stats/stats.component';
import {OrderHelpComponent} from './components/order-help/order-help.component';
import {ServiceCardsComponent} from './components/service-cards/service-cards.component';
import {UiBtnTextIconComponent} from '../../shared/ui/ui-btn-text-icon/ui-btn-text-icon.component';
import {PartnersComponent} from './components/partners/partners.component';
import {QuestionsComponent} from './components/questions/questions.component';
import {ReviewsComponent} from './components/reviews/reviews.component';
import {SubscribeComponent} from './components/subscribe/subscribe.component';
import {BidComponent} from './components/bid/bid.component';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    StatsComponent,
    OrderHelpComponent,
    ServiceCardsComponent,
    PartnersComponent,
    QuestionsComponent,
    ReviewsComponent,
    SubscribeComponent,
    BidComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent {

  stats_title= `<span class="highlight">Образование, языковые курсы
  и&nbsp;профессиональные стажировки во&nbsp;Франции,</span>
  а&nbsp;также в&nbsp;других странах Европы, Северной Америки и&nbsp;по&nbsp;всему миру`

  statsData: StatCard[] = [
    {
      number: '&gt;12&nbsp;лет',
      description: 'Помогаем студентам получить<br>образование во&nbsp;Франции<br>и&nbsp;в&nbsp;других странах'
    },
    {
      number: '&gt;900',
      description: 'Партнёров и&nbsp;учебных<br>заведений по&nbsp;всему миру'
    },
    {
      number: '&gt;4000',
      description: 'Клиентов довольны нашими<br>услугами: от&nbsp;подбора учебного<br>заведения до&nbsp;помощи в&nbsp;адаптации'
    }
  ];

  constructor(private title: Title) {
    this.title.setTitle('Главная')
  }
}
