import {
  AfterViewInit, Directive, ElementRef, OnDestroy, Renderer2
} from '@angular/core';

@Directive({
  selector: '[appOneLineAlign]',
  standalone: true
})
export class OneLineAlignDirective implements AfterViewInit, OnDestroy {
  private ro?: ResizeObserver;

  constructor(private el: ElementRef<HTMLElement>, private r2: Renderer2) {}

  ngAfterViewInit() {
    const target = this.el.nativeElement;
    this.ro = new ResizeObserver(() => this.update());
    this.ro.observe(target);
    // первый расчёт после рендера
    queueMicrotask(() => this.update());
  }

  ngOnDestroy() { this.ro?.disconnect(); }

  private update() {
    const textEl = this.el.nativeElement;
    const parent = textEl.parentElement as HTMLElement | null;
    if (!parent) return;

    const cs = getComputedStyle(textEl);
    let lineHeight = parseFloat(cs.lineHeight);
    if (Number.isNaN(lineHeight)) {
      const fs = parseFloat(cs.fontSize) || 16;
      lineHeight = fs * 1.2; // дефолт
    }
    const lines = Math.round(textEl.scrollHeight / lineHeight);

    if (lines <= 1) {
      this.r2.addClass(parent, 'feature--one-line');
    } else {
      this.r2.removeClass(parent, 'feature--one-line');
    }
  }
}
