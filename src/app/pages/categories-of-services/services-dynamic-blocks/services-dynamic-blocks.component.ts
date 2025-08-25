import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UiBtnTextIconComponent} from '../../../shared/ui/ui-btn-text-icon/ui-btn-text-icon.component';

interface BlockData {
  id: number;
  title: string;
  description: string;
  price: string;
  hasLongPrice: boolean;
  aspectRatio: string;
  backgroundColor: string;
  cssClass: string;
}

interface RowData {
  type: number;
  blocks: BlockData[];
  cssClass: string;
}

@Component({
  selector: 'app-services-dynamic-blocks',
  imports: [CommonModule, UiBtnTextIconComponent],
  templateUrl: './services-dynamic-blocks.component.html',
  styleUrl: './services-dynamic-blocks.component.scss'
})
export class ServicesDynamicBlocksComponent implements OnInit {
  rows: RowData[] = [];
  allBlocks: BlockData[] = [];

  colors = [
    '#5A9FD4', '#7B8794', '#4A90A4', '#6B9DC2',
    '#8FA4B3', '#5C8A9C', '#7BA5B8', '#4F7A8C',
    '#6D98B0', '#8BB4C7', '#5E8FA2', '#7CA9BC'
  ];

  serviceTemplates = [
    {
      title: 'Получение медицинской страховки',
      description: 'Чтобы чувствовать себя спокойно во время поездок, учебы, или проживания за границей, оформите страхование вместе с нами',
      price: 'Бесплатно',
    },
    {
      title: 'Налоговая декларация',
      description: 'Налоговая декларация — то, с чем Вы неизбежно столкнетесь во время проживания во Франции. Адвокатский Кабардэш поможет грамотно оформить все документы',
      price: '200&nbsp;€',
    },
    {
      title: 'Первый визит к врачу',
      description: 'Наши сотрудники отведут Вас к врачу, помогут с переводом и будут рядом во время визита первого визита в поликлинику во Франции',
      price: '200&nbsp;€',
    },
    {
      title: 'Подключение интернета',
      description: 'Quarter Latin поможет выбрать подходящего провайдера во Франции. Мы знаем как выбрать лучшие услуги и тарифы сотовой подключения за границей',
      price: '200&nbsp;€',
    },
    {
      title: 'Проездной',
      description: 'Студенческий проездной - это огромная экономия ежедневных расходов во Франции. Обратитесь к нам, чтобы получить его в кратчайшие сроки',
      price: '100&nbsp;€',
    },
    {
      title: 'Пакеты услуг по адаптации',
      description: 'Quarter Latin предлагает полный пакет услуги по адаптации, который включает важные этапы. Оформление быстро и качественно проживания',
      price: 'От 1000&nbsp;€',
    },
    {
      title: 'Оформление госaударственной страховки',
      description: 'Quarter Latin оказывает полное сопровождение в оформлении государственной медицинской страховки во Франции',
      price: '400&nbsp;€',
    }
  ];

  rowTypes = [
    { type: 1, pattern: ['16/9', '5/4'], cssClass: 'row-type-1' },
    { type: 2, pattern: ['5/4', '16/9'], cssClass: 'row-type-2' },
    { type: 3, pattern: ['1/1', '1/1', '1/1'], cssClass: 'row-type-3' }
  ];

  ngOnInit(): void {
    this.generateBlocks();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.arrangeBlocks();
  }

  generateBlocks(): void {
    this.allBlocks = [];

    // Создаем 7 блоков
    for (let i = 0; i < 7; i++) {
      const template = this.serviceTemplates[i % this.serviceTemplates.length];

      // Определяем, является ли цена длинной
      const hasLongPrice = this.isLongPrice(template.price);

      this.allBlocks.push({
        id: i + 1,
        title: template.title,
        description: template.description,
        price: template.price,
        hasLongPrice: hasLongPrice, // Добавляем новое поле
        aspectRatio: '1/1', // Временно, будет переопределено
        backgroundColor: this.getRandomColor(),
        cssClass: 'ratio-1-1', // Временно
      });
    }

    this.shuffleArray(this.allBlocks);
    this.arrangeBlocks();
  }

  private isLongPrice(price: string): boolean {
    // Удаляем HTML теги, HTML-сущности (&nbsp;, &euro; и т.д.) и лишние пробелы
    const cleanPrice = price
      .replace(/<[^>]*>/g, '') // Убираем HTML теги
      .replace(/&[a-zA-Z0-9#]+;/g, ' ') // Убираем HTML-сущности (&nbsp;, &euro; и т.д.)
      .replace(/\s+/g, ' ') // Заменяем множественные пробелы на один
      .trim();

    // Определяем как длинную цену, если:
    // - длина больше 8 символов
    // - содержит текст без цифр (например, "Бесплатно", "От 1000 €")
    // - содержит слова "От", "до", "Бесплатно" и т.д.
    const longPricePatterns = /^(бесплатно)/i;

    return cleanPrice.length > 8 || longPricePatterns.test(cleanPrice);
  }

  arrangeBlocks(): void {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 500) {
      // Мобильная версия: по 1 блоку 1/1 в строке
      this.rows = this.allBlocks.map(block => ({
        type: 7, // Специальный тип для мобильных
        blocks: [{
          ...block,
          aspectRatio: '1/1',
          cssClass: 'ratio-1-1'
        }],
        cssClass: 'row-mobile-single'
      }));
    } else if (screenWidth > 500 && screenWidth <= 728) {
      // Версия 500-728px: блоки 16/9, по 1 в строке
      this.rows = this.allBlocks.map(block => ({
        type: 8, // Специальный тип для диапазона 500-728px
        blocks: [{
          ...block,
          aspectRatio: '16/9',
          cssClass: 'ratio-16-9'
        }],
        cssClass: 'row-medium-single'
      }));
    } else if (screenWidth > 728 && screenWidth <= 1200) {
      // Планшетная версия: блоки 1/1, максимум 2 в строке
      this.rows = [];
      for (let i = 0; i < this.allBlocks.length; i += 2) {
        const rowBlocks = this.allBlocks.slice(i, i + 2).map(block => ({
          ...block,
          aspectRatio: '1/1',
          cssClass: 'ratio-1-1'
        }));

        this.rows.push({
          type: 6, // Специальный тип для планшетов
          blocks: rowBlocks,
          cssClass: 'row-tablet-two'
        });
      }
    } else {
      // Десктопная версия: исходная логика
      this.createDesktopLayout();
    }
  }

  createDesktopLayout(): void {
    this.rows = [];

    // Разделяем блоки на группы: с числовой ценой, без числовой цены и с длинной ценой
    const blocksWithNumericPrice = this.allBlocks.filter(block => /\d/.test(block.price) && !block.hasLongPrice);
    const blocksWithoutNumericPrice = this.allBlocks.filter(block => !/\d/.test(block.price) && !block.hasLongPrice);
    const blocksWithLongPrice = this.allBlocks.filter(block => block.hasLongPrice);

    // Создаем копию всех паттернов для использования
    const availablePatterns = [...this.rowTypes];

    let numericPriceIndex = 0;
    let nonNumericPriceIndex = 0;
    let longPriceIndex = 0;

    // Создаем ровно 3 строки, используя каждый паттерн по одному разу
    for (let i = 0; i < 3; i++) {
      if (availablePatterns.length === 0) break;

      // Выбираем случайный паттерн из оставшихся
      const randomIndex = Math.floor(Math.random() * availablePatterns.length);
      const selectedPattern = availablePatterns.splice(randomIndex, 1)[0];

      const rowBlocks: BlockData[] = [];

      selectedPattern.pattern.forEach((aspectRatio) => {
        let blockToUse: BlockData | undefined;

        if (aspectRatio === '1/1') {
          // Для 1/1 используем блоки с короткой числовой ценой
          if (numericPriceIndex < blocksWithNumericPrice.length) {
            blockToUse = blocksWithNumericPrice[numericPriceIndex];
            numericPriceIndex++;
          }
        } else {
          // Для 16/9 и 5/4 можем использовать блоки с длинной ценой или без числовой цены
          if (longPriceIndex < blocksWithLongPrice.length) {
            blockToUse = blocksWithLongPrice[longPriceIndex];
            longPriceIndex++;
          }
          else if (nonNumericPriceIndex < blocksWithoutNumericPrice.length) {
            blockToUse = blocksWithoutNumericPrice[nonNumericPriceIndex];
            nonNumericPriceIndex++;
          }
          // В крайнем случае берем блок с числовой ценой
          else if (numericPriceIndex < blocksWithNumericPrice.length) {
            blockToUse = blocksWithNumericPrice[numericPriceIndex];
            numericPriceIndex++;
          }
        }

        if (blockToUse) {
          rowBlocks.push({
            ...blockToUse,
            aspectRatio: aspectRatio,
            cssClass: this.getCssClassFromRatio(aspectRatio)
          });
        }
      });

      this.rows.push({
        type: selectedPattern.type,
        blocks: rowBlocks,
        cssClass: selectedPattern.cssClass
      });
    }

    // Перемешиваем строки для случайного порядка
    this.shuffleArray(this.rows);
  }

  private getCssClassFromRatio(aspectRatio: string): string {
    switch (aspectRatio) {
      case '16/9': return 'ratio-16-9';
      case '5/4': return 'ratio-5-4';
      case '1/1': return 'ratio-1-1';
      default: return 'ratio-1-1';
    }
  }

  private getRandomColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  private shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
