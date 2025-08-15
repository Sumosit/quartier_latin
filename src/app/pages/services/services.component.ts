import { Component } from '@angular/core';
import {BidComponent} from "../home/components/bid/bid.component";
import {HeroComponent} from "../home/components/hero/hero.component";
import {OrderHelpComponent} from "../home/components/order-help/order-help.component";
import {PartnersComponent} from "../home/components/partners/partners.component";
import {QuestionsComponent} from "../home/components/questions/questions.component";
import {ReviewsComponent} from "../home/components/reviews/reviews.component";
import {ServiceCardsComponent} from "../home/components/service-cards/service-cards.component";
import {StatsComponent} from "../home/components/stats/stats.component";
import {SubscribeComponent} from "../home/components/subscribe/subscribe.component";
import {TabsComponent} from '../../shared/ui/ui-tabs/ui-tabs.component';
import {ServiceCardsBigComponent} from './service-cards-big/service-cards-big.component';

@Component({
  selector: 'app-services',
  imports: [
    BidComponent,
    HeroComponent,
    OrderHelpComponent,
    PartnersComponent,
    QuestionsComponent,
    ReviewsComponent,
    ServiceCardsComponent,
    StatsComponent,
    SubscribeComponent,
    TabsComponent,
    ServiceCardsBigComponent
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {

}
