// reviews.component.ts
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { UiBtnTextIconComponent } from '../../../../shared/ui/ui-btn-text-icon/ui-btn-text-icon.component';

export interface Review {
  avatar_url: string;
  name: string;
  from: string;
  message: string;
}

@Component({
  selector: 'app-reviews',
  imports: [UiBtnTextIconComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit, OnDestroy {
  @ViewChild('reviewsContainer', { static: true }) reviewsContainer!: ElementRef;

  private animationId?: number;
  private isPaused = false;
  private scrollSpeed = 0.08; // пикселей в миллисекунду
  private lastTimestamp = 0;

  reviews: Review[] = [
    {
      avatar_url: 'assets/images/review_1.png',
      name: 'Роман',
      from: 'Montpellier Business School',
      message: 'Я очень рад, что сейчас я живу во Франции, имею возможность путешествовать по Европе и смотреть мир'
    },
    {
      avatar_url: 'assets/images/review_2.png',
      name: 'Анна',
      from: 'Montpellier Business School',
      message: 'Не думала, что переезд во Францию может быть таким комфортным, спасибо вам!'
    },
  ];

  // Дублируем отзывы для бесконечной прокрутки
  get duplicatedReviews() {
    return [...this.reviews, ...this.reviews, ...this.reviews, ...this.reviews, ...this.reviews, ...this.reviews];
  }

  ngOnInit(): void {
    // Запускаем автопрокрутку
    setTimeout(() => this.startAutoScroll(), 100);
  }

  ngOnDestroy(): void {
    this.stopAutoScroll();
  }

  private startAutoScroll(): void {
    if (this.animationId) return;

    const animate = (timestamp: number) => {
      if (!this.lastTimestamp) {
        this.lastTimestamp = timestamp;
      }

      const deltaTime = timestamp - this.lastTimestamp;
      this.lastTimestamp = timestamp;

      if (!this.isPaused && this.reviewsContainer?.nativeElement) {
        const container = this.reviewsContainer.nativeElement;

        // Плавное движенрие на основе времени
        const scrollDistance = this.scrollSpeed * deltaTime;
        container.scrollLeft += scrollDistance;

        // Логика для бесконечной прокрутки
        const singleSetWidth = container.scrollWidth / 6;

        // Когда прокрутили один полный набор отзывов, сбрасываем
        if (container.scrollLeft >= singleSetWidth) {
          container.scrollLeft = container.scrollLeft - singleSetWidth;
        }
      }

      this.animationId = requestAnimationFrame(animate);
    };

    this.lastTimestamp = 0;
    this.animationId = requestAnimationFrame(animate);
  }

  private stopAutoScroll(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = undefined;
      this.lastTimestamp = 0;
    }
  }

  onMouseEnter(): void {
    this.isPaused = true;
  }

  onMouseLeave(): void {
    this.isPaused = false;
    this.lastTimestamp = 0; // Сбрасываем время для корректного возобновления
  }
}
