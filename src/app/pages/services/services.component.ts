import { Component } from '@angular/core';
import {BidComponent} from "../home/components/bid/bid.component";
import {HeroComponent} from "../home/components/hero/hero.component";
import {OrderHelpComponent} from "../home/components/order-help/order-help.component";
import {PartnersComponent} from "../home/components/partners/partners.component";
import {QuestionsComponent} from "../home/components/questions/questions.component";
import {ReviewsComponent} from "../home/components/reviews/reviews.component";
import {ServiceCardsComponent} from "../home/components/service-cards/service-cards.component";
import {StatCard, StatsComponent} from "../home/components/stats/stats.component";
import {SubscribeComponent} from "../home/components/subscribe/subscribe.component";
import {TabsComponent} from '../../shared/ui/ui-tabs/ui-tabs.component';
import {ServiceCardsBigComponent} from './service-cards-big/service-cards-big.component';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-services',
  imports: [
    BidComponent,
    ReviewsComponent,
    StatsComponent,
    TabsComponent,
    ServiceCardsBigComponent
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {

  constructor(private title: Title) {
    this.title.setTitle('Услуги')
  }

  statsTitle= `Помогли <span class="tag">более чем 4000</span> студентам поступить`

  statsData: StatCard[] = [
    {
      number: '&gt;4000',
      description: 'Успешных зачислений'
    },
    {
      number: '&gt;600',
      description: 'Студенческих резиденций'
    },
    {
      number: '&gt;200',
      description: 'Учебных заведений-партнёров'
    }
  ];
}
