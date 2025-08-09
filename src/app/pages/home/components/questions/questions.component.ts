import {AfterViewInit, Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {UiBtnIconComponent} from '../../../../shared/ui/ui-btn-icon/ui-btn-icon.component';
import {UiBtnTextIconComponent} from '../../../../shared/ui/ui-btn-text-icon/ui-btn-text-icon.component';

export interface Question {
  question: string,
  answer: string,
  is_open: boolean
}

@Component({
  selector: 'app-questions',
  imports: [
    UiBtnIconComponent,
    UiBtnTextIconComponent
  ],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss'
})
export class QuestionsComponent implements AfterViewInit {
  @ViewChildren('answerWrapper') answerWrappers!: QueryList<ElementRef>;

  questions: Question[] = [
    {
      question: 'Какой уровень владения иностранным языком требуется для поступления в зарубежный вуз?',
      answer: 'Для государственных вузов сроки подачи заявлений меняются ежегодно, и мы всегда сверяем их ' +
        'с официальной информацией. Обычно это до середины декабря для первого курса и до конца января' +
        'для остальных. Тем не менее сроки также зависят от вашего гражданства и страны, откуда вы подаетесь. Например, если вы подаёте документы, находясь во Франции, то сроки увеличиваются до конца марта. ' +
        'В частных вузах даты приема документов более гибкие и, как правило, завершаются к концу мая.',
      is_open: false
    },
    {
      question: 'Существует ли возможность обучения на английском в неанглоязычных странах?',
      answer: 'Обучение в государственных вузах Франции стоит совсем недорого, а для отличников и вовсе может быть практически бесплатным. Кроме того, существуют стипендии для магистерских программ, которые предоставляются за сильное портфолио: отличные оценки, мотивацию и опыт.',
      is_open: false
    },
    {
      question: 'Можно ли трудоустроиться во Франции после окончания французского университета?',
      answer: 'После завершения обучения можно получить визу «поиска работы» на один год, которая позволит легально находиться во Франции и искать рабочий контракт, или сразу сменить статус на рабочую визу при наличии предложения о трудоустройстве.',
      is_open: false
    },
    {
      question: 'Какой уровень владения иностранным языком требуется для поступления в зарубежный вуз?',
      answer: 'Для большинства программ минимальный уровень языка — B2, а для некоторых требуется C1.',
      is_open: false
    },
  ]

  ngAfterViewInit() {
    // Инициализация высот
    this.updateHeights();
  }

  toggleQuestion(index: number): void {
    this.questions[index].is_open = !this.questions[index].is_open;

    // Обновляем высоту
    setTimeout(() => this.updateHeight(index), 0);
  }

  private updateHeight(index: number): void {
    const wrapper = this.answerWrappers.toArray()[index];
    if (wrapper) {
      const element = wrapper.nativeElement;
      if (this.questions[index].is_open) {
        const scrollHeight = element.scrollHeight;
        element.style.maxHeight = scrollHeight + 'px';
      } else {
        element.style.maxHeight = '0px';
      }
    }
  }

  private updateHeights(): void {
    this.answerWrappers.forEach((wrapper, index) => {
      this.updateHeight(index);
    });
  }
}
