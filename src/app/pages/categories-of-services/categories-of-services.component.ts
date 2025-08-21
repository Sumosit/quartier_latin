import { Component } from '@angular/core';
import {PageBannerComponent} from './page-banner/page-banner.component';
import {ServicesDynamicBlocksComponent} from './services-dynamic-blocks/services-dynamic-blocks.component';
import {TextComponentComponent} from './text-component/text-component.component';
import {PricesServicesComponent} from './prices-services/prices-services.component';
import {QuestionsComponent} from '../home/components/questions/questions.component';
import {ReviewsComponent} from '../home/components/reviews/reviews.component';
import {BidComponent} from '../home/components/bid/bid.component';

@Component({
  selector: 'app-categories-of-services',
  imports: [
    PageBannerComponent,
    ServicesDynamicBlocksComponent,
    TextComponentComponent,
    PricesServicesComponent,
    QuestionsComponent,
    ReviewsComponent,
    BidComponent
  ],
  templateUrl: './categories-of-services.component.html',
  styleUrl: './categories-of-services.component.scss'
})
export class CategoriesOfServicesComponent {

}
