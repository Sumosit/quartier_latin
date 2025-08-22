import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {UiBtnTextIconComponent} from '../../../../shared/ui/ui-btn-text-icon/ui-btn-text-icon.component';
import {UiInputDropdownComponent} from '../../../../shared/ui/ui-dropdown/ui-dropdown.component';

export interface StatCard {
  number: string;
  description: string; // можно хранить с <br> и &nbsp;
}

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, UiBtnTextIconComponent, UiInputDropdownComponent],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  host: {
    '[class.content]': 'mainSectionType === 0',
    '[class.content-v1]': 'mainSectionType === 1',
  }
})
export class StatsComponent {
  @Input() mainSectionType: number = 0;

  /** Заголовок секции */
  @Input() title: string = '';

  /** Карточки статистики */
  @Input() stats: StatCard[] = [];
}
