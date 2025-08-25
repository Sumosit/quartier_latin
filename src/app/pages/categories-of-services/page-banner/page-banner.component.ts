import {Component, Input} from '@angular/core';
import {UiBtnTextIconComponent} from '../../../shared/ui/ui-btn-text-icon/ui-btn-text-icon.component';
import {RouterLink} from '@angular/router';

export interface BannerPath {
  label: string;
  link?: string; // если нужно делать кликабельные ссылки
  current?: boolean;
}

@Component({
  selector: 'app-page-banner',
  imports: [
    UiBtnTextIconComponent,
    RouterLink
  ],
  templateUrl: './page-banner.component.html',
  styleUrl: './page-banner.component.scss'
})
export class PageBannerComponent {
  @Input() paths: BannerPath[] = [];       // список хлебных крошек
}
