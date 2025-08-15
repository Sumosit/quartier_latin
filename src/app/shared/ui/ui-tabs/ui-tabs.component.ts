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

  ngAfterViewInit() {
    // выставляем активную
    if (!this.active && this.items.length) this.active = this.items[0].value;

    // первый расчёт
    this.afterPaint(() => { this.updateIndicator(); this.observeActiveEl(); });

    // если список кнопок изменился
    this.tabBtns.changes.subscribe(() => {
      this.afterPaint(() => { this.updateIndicator(); this.observeActiveEl(); });
    });
  }

  ngOnDestroy() { this.ro?.disconnect(); }

  @HostListener('window:resize')
  onResize() { this.updateIndicator(); }

  setActive(value: string) {
    if (this.active === value) return;
    this.active = value;
    this.activeChange.emit(value);
    this.afterPaint(() => { this.updateIndicator(); this.observeActiveEl(); });
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

    this.indicatorLeft.set(r.left - pr.left);
    this.indicatorWidth.set(r.width);
  }

  private observeActiveEl() {
    this.ro?.disconnect();
    const i = this.activeIndex();
    const el = this.tabBtns?.get(i)?.nativeElement;
    if (!el || !('ResizeObserver' in window)) return;

    this.ro = new ResizeObserver(() => this.updateIndicator());
    this.ro.observe(el);
    // заодно следим за контейнером track, если он меняет ширину
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
    this.tabBtns.get(next)?.nativeElement.focus();
  }
}
