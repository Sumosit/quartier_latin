import {
  Component, Input, Output, EventEmitter, HostListener, signal, effect, OnDestroy, EffectRef
} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {SvgIconComponent} from 'angular-svg-icon';
import {UiBtnTextIconComponent} from '../../ui/ui-btn-text-icon/ui-btn-text-icon.component';
import {UiInputDropdownComponent} from '../../ui/ui-dropdown/ui-dropdown.component';

type MenuItem = {
  label: string;
  link?: any[] | string;
  children?: { label: string; link: any[] | string }[];
  key?: string;
};

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SvgIconComponent, UiBtnTextIconComponent, UiInputDropdownComponent],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss'
})
export class MobileMenuComponent implements OnDestroy {
  @Input({required: true}) open = false;
  @Output() closed = new EventEmitter<void>();

  openSections = new Set<string>();

  isOpen(k?: string): boolean {
    return !!k && this.openSections.has(k);
  }

  toggle(k?: string): void {
    if (!k) return;

    if (this.isOpen(k)) {
      this.openSections.delete(k);
    } else {
      this.openSections.add(k);
    }
  }
  // управляем блокировкой прокрутки страницы, когда меню открыто
  private bodyLocked = signal(false);
  private effectRef: EffectRef = effect(() => {
    const lock = this.open;
    if (lock && !this.bodyLocked()) {
      document.body.dataset['_scrollLock'] = '1';
      document.body.style.overflow = 'hidden';
      this.bodyLocked.set(true);
    } else if (!lock && this.bodyLocked()) {
      this.unlockBody();
    }
  });

  menu: MenuItem[] = [
    { label: 'Главная', link: ['/'] },
    {
      label: 'Услуги', key: 'services',
      children: [
        { label: 'Консультации', link: ['/services/consulting'] },
        { label: 'Визы и документы', link: ['/services/visa'] },
        { label: 'Релокация', link: ['/services/relocation'] },
      ]
    },
    {
      label: 'Образование', key: 'education',
      children: [
        { label: 'Языковые курсы', link: ['/education/language'] },
        { label: 'Колледжи', link: ['/education/college'] },
        { label: 'Университеты', link: ['/education/universities'] },
      ]
    },
    { label: 'Проживание', link: ['/accommodation'] },
    { label: 'О компании', link: ['/about'] },
  ];

  ngOnDestroy(): void {
    this.unlockBody();
    this.effectRef.destroy();
  }

  private unlockBody(): void {
    if (this.bodyLocked()) {
      delete document.body.dataset['_scrollLock'];
      document.body.style.overflow = '';
      this.bodyLocked.set(false);
    }
  }

  close(): void {
    this.closed.emit();
  }

  onBackdropClick(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('mm__backdrop')) {
      this.close();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    if (this.open && e.key === 'Escape') {
      this.close();
    }
  }
}
