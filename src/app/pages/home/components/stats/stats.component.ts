import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UiBtnTextIconComponent} from '../../../../shared/ui/ui-btn-text-icon/ui-btn-text-icon.component';

interface Star {
  angle: number;
}

@Component({
  selector: 'app-stats',
  imports: [CommonModule, UiBtnTextIconComponent],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
  standalone: true
})
export class StatsComponent {
  constructor() {

  }
}
