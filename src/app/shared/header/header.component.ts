import {Component, NgZone, OnDestroy, OnInit, signal} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, NavigationEnd, Scroll} from '@angular/router';
import {UiBtnTextIconComponent} from "../ui/ui-btn-text-icon/ui-btn-text-icon.component";
import {UiBtnIconComponent} from '../ui/ui-btn-icon/ui-btn-icon.component';
import {ModalService} from '../modal-field/modal.service';
import {filter, Subscription, merge} from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, UiBtnTextIconComponent, UiBtnIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMobileMenuOpen = false;
  solid = signal(true);

  private io?: IntersectionObserver;
  private sub?: Subscription;

  constructor(
    private router: Router,
    private zone: NgZone,
    protected modalService: ModalService,
  ) {}

  ngOnInit() {
    // Пересоздаём наблюдение и пересчитываем состояние:
    // - после активации маршрута (NavigationEnd)
    // - после восстановления скролла роутером (Scroll)
    this.sub = merge(
      this.router.events.pipe(filter(e => e instanceof NavigationEnd)),
      this.router.events.pipe(filter((e): e is Scroll => e instanceof Scroll)),
    ).subscribe(() => this.afterScrollRestored(() => this.setupObserver()));

    // первичный запуск
    this.afterScrollRestored(() => this.setupObserver());
  }

  ngOnDestroy() {
    this.io?.disconnect();
    this.sub?.unsubscribe();
  }

  navigateToHome() { this.router.navigate(['/']); }
  toggleMobileMenu() { this.isMobileMenuOpen = !this.isMobileMenuOpen; }

  private setupObserver() {
    this.io?.disconnect();

    const hero = document.querySelector<HTMLElement>('.hero');
    if (!hero) { this.solid.set(true); return; }

    // начальный расчёт уже после восстановления скролла
    this.solid.set(!this.isInViewport(hero));

    this.io = new IntersectionObserver(
      ([entry]) => {
        this.zone.run(() => this.solid.set(!entry.isIntersecting));
      },
      { threshold: 0.01 }
    );
    this.io.observe(hero);
  }

  private isInViewport(el: HTMLElement): boolean {
    const r = el.getBoundingClientRect();
    return r.bottom > 0 && r.right > 0 && r.top < window.innerHeight && r.left < window.innerWidth;
  }

  // ждём рендер + восстановление скролла
  private afterScrollRestored(cb: () => void) {
    requestAnimationFrame(() => requestAnimationFrame(cb));
  }
}
