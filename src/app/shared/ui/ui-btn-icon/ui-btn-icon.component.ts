import {AfterViewInit, Component, HostListener, Input} from '@angular/core';
import {Icons, SvgsComponent} from '../../svgs/svgs.component';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-ui-btn-icon',
  imports: [SvgsComponent, NgClass],
  templateUrl: './ui-btn-icon.component.html',
  styleUrl: './ui-btn-icon.component.scss'
})
export class UiBtnIconComponent implements AfterViewInit {
  @Input() btnStyle: string | 'style-1' | 'style-2' | 'style-3' | 'style-4' = 'style-1';
  @Input() btnStatus: string = '';
  @Input() btnSize: '' | 'small' | 'medium' = '';
  @Input() btnIcon: Icons = '';
  @Input() isResponsive: boolean = false;

  /** Маска для responsive стадий: [desktop, medium, small] */
  @Input() responsiveMask: [0 | 1, 0 | 1, 0 | 1] = [1, 1, 1];

  responsiveIcon: Icons = '';

  constructor() {
  }

  ngAfterViewInit(): void {
    this.updateResponsiveIcon(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    this.updateResponsiveIcon((event.target as Window).innerWidth);
  }

  private updateResponsiveIcon(width: number) {
    if (!this.isResponsive) {
      this.responsiveIcon = this.btnIcon;
      return;
    }

    // desktop
    if (width > 1024) {
      this.responsiveIcon = this.responsiveMask[0]
        ? this.btnIcon
        : this.btnIcon;
      return;
    }

    // medium
    if (width <= 1024 && width > 500) {
      this.responsiveIcon = this.responsiveMask[1]
        ? (this.btnIcon + '-medium') as Icons
        : this.btnIcon;
      return;
    }

    // small
    if (width <= 500) {
      this.responsiveIcon = this.responsiveMask[2]
        ? (this.btnIcon + '-small') as Icons
        : this.btnIcon;
      return;
    }
  }
}
