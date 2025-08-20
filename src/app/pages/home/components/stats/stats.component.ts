import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {UiBtnTextIconComponent} from '../../../../shared/ui/ui-btn-text-icon/ui-btn-text-icon.component';
import {UiInputDropdownComponent} from '../../../../shared/ui/ui-dropdown/ui-dropdown.component';

@Component({
  selector: 'app-stats',
  imports: [CommonModule, UiBtnTextIconComponent, UiInputDropdownComponent],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
  standalone: true,
  host: {
    '[class.content]': 'mainSectionType === 0',
    '[class.content-v1]': 'mainSectionType === 1',
  }
})
export class StatsComponent {
  @Input() mainSectionType: number = 0
}
