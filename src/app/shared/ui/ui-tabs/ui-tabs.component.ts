import {CommonModule} from '@angular/common';
import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef,
  EventEmitter, HostListener, Input, OnDestroy, Output, QueryList, ViewChildren, signal
} from '@angular/core';

export interface TabItem { label: string; value: string; disabled?: boolean; }

@Component({
  selector: 'app-ui-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-tabs.component.html',
  styleUrl: './ui-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements AfterViewInit, OnDestroy {
  @Input({required: true}) items: TabItem[] = [];
  @Input() active: string | null = null;
  @Output() activeChange = new EventEmitter<string>();

  @ViewChildren('tabBtn') tabBtns!: QueryList<ElementRef<HTMLElement>>;

  indicatorLeft = signal(0);
  indicatorWidth = signal(0);

  private ro?: ResizeObserver;
  private isDragging = false;
  private startX = 0;
  private scrollLeft = 0;
  private tabsContainer?: HTMLElement;
  private dragStartTime = 0;
  private hasDraggedDistance = false;

  ngAfterViewInit() {
    // выставляем активную
    if (!this.active && this.items.length) this.active = this.items[0].value;

    this.tabsContainer = this.tabBtns.first?.nativeElement.parentElement as HTMLElement;

    this.setupDragScroll();

    this.afterPaint(() => { this.updateIndicator(); this.observeActiveEl(); });

    this.tabBtns.changes.subscribe(() => {
      this.afterPaint(() => { this.updateIndicator(); this.observeActiveEl(); });
    });
  }

  ngOnDestroy() {
    this.ro?.disconnect();
    this.cleanupDragScroll();
  }

  @HostListener('window:resize')
  onResize() {
    this.afterPaint(() => this.updateIndicator());
  }

  setActive(value: string) {
    if (this.active === value) return;
    this.active = value;
    this.activeChange.emit(value);
    this.afterPaint(() => { this.updateIndicator(); this.observeActiveEl(); });
  }

  onTabClick(value: string, event: MouseEvent) {
    // Проверяем, было ли это действительно перетягивание
    if (this.hasDraggedDistance) {
      event.preventDefault();
      return;
    }
    this.setActive(value);
  }

  onWheel(event: WheelEvent) {
    if (!this.tabsContainer) return;

    if (this.tabsContainer.scrollWidth > this.tabsContainer.clientWidth) {
      event.preventDefault();
      this.tabsContainer.scrollLeft += event.deltaY;

      this.afterPaint(() => this.updateIndicator());
    }
  }

  private activeIndex(): number {
    const i = this.items.findIndex(t => t.value === this.active);
    return i >= 0 ? i : 0;
  }

  private updateIndicator() {
    const i = this.activeIndex();
    const el = this.tabBtns?.get(i)?.nativeElement;
    if (!el) return;

    const parent = el.parentElement!;
    const r = el.getBoundingClientRect();
    const pr = parent.getBoundingClientRect();

    const scrollLeft = parent.scrollLeft;
    const relativeLeft = r.left - pr.left + scrollLeft;

    this.indicatorLeft.set(relativeLeft);
    this.indicatorWidth.set(r.width);
  }

  private observeActiveEl() {
    this.ro?.disconnect();
    const i = this.activeIndex();
    const el = this.tabBtns?.get(i)?.nativeElement;
    if (!el || !('ResizeObserver' in window)) return;

    this.ro = new ResizeObserver(() => {
      this.afterPaint(() => this.updateIndicator());
    });
    this.ro.observe(el);
    this.ro.observe(el.parentElement!);
  }

  private afterPaint(cb: () => void) {
    requestAnimationFrame(() => requestAnimationFrame(cb));
  }

  // клавиатура
  onKey(ev: KeyboardEvent, i: number) {
    const enabled = this.items.map((t, ix) => ({t, ix})).filter(x => !x.t.disabled).map(x => x.ix);
    const pos = enabled.indexOf(i);
    if (pos === -1) return;

    let next = i;
    switch (ev.key) {
      case 'ArrowRight': next = enabled[(pos + 1) % enabled.length]; break;
      case 'ArrowLeft':  next = enabled[(pos - 1 + enabled.length) % enabled.length]; break;
      case 'Home':       next = enabled[0]; break;
      case 'End':        next = enabled[enabled.length - 1]; break;
      default: return;
    }
    ev.preventDefault();
    this.setActive(this.items[next].value);

    const nextEl = this.tabBtns.get(next)?.nativeElement;
    if (nextEl) {
      nextEl.focus();
      // Плавная прокрутка к элементу если он не виден
      nextEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  private setupDragScroll() {
    if (!this.tabsContainer) return;

    const container = this.tabsContainer;

    const onMouseDown = (e: MouseEvent) => {
      this.isDragging = true;
      this.hasDraggedDistance = false;
      this.dragStartTime = Date.now();
      this.startX = e.pageX - container.offsetLeft;
      this.scrollLeft = container.scrollLeft;
      container.style.cursor = 'grabbing';
      container.style.userSelect = 'none';
    };

    const onMouseLeave = () => {
      this.isDragging = false;
      container.style.cursor = '';
      container.style.userSelect = '';
    };

    const onMouseUp = () => {
      this.isDragging = false;
      container.style.cursor = '';
      container.style.userSelect = '';

      // Сбрасываем флаг перетягивания через небольшую задержку
      // чтобы click event успел обработаться
      setTimeout(() => {
        this.hasDraggedDistance = false;
      }, 10);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!this.isDragging) return;
      e.preventDefault();

      const x = e.pageX - container.offsetLeft;
      const walk = (x - this.startX) * 1.5;
      const newScrollLeft = this.scrollLeft - walk;

      // Определяем, произошло ли значительное перетягивание
      if (Math.abs(walk) > 5) {
        this.hasDraggedDistance = true;
      }

      container.scrollLeft = newScrollLeft;
      this.afterPaint(() => this.updateIndicator());
    };

    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);

    (container as any).__dragHandlers = {
      mousedown: onMouseDown,
      mouseleave: onMouseLeave,
      mouseup: onMouseUp,
      mousemove: onMouseMove
    };
  }

  private cleanupDragScroll() {
    if (!this.tabsContainer) return;

    const handlers = (this.tabsContainer as any).__dragHandlers;
    if (handlers) {
      this.tabsContainer.removeEventListener('mousedown', handlers.mousedown);
      this.tabsContainer.removeEventListener('mouseleave', handlers.mouseleave);
      this.tabsContainer.removeEventListener('mouseup', handlers.mouseup);
      this.tabsContainer.removeEventListener('mousemove', handlers.mousemove);
    }
  }
}
