import { Component } from '@angular/core';
import {HeroComponent} from './components/hero/hero.component';
import {StatsComponent} from './components/stats/stats.component';
import {OrderHelpComponent} from './components/order-help/order-help.component';
import {ServiceCardsComponent} from './components/service-cards/service-cards.component';
import {UiBtnTextIconComponent} from '../../shared/ui/ui-btn-text-icon/ui-btn-text-icon.component';
import {PartnersComponent} from './components/partners/partners.component';
import {QuestionsComponent} from './components/questions/questions.component';
import {ReviewsComponent} from './components/reviews/reviews.component';
import {SubscribeComponent} from './components/subscribe/subscribe.component';
import {BidComponent} from './components/bid/bid.component';

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

}
