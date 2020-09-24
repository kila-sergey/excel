import {ExcelComponent} from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'formula';

  toHtml() {
    return `
      <div class="formula__mark">fx</div>
      <div class="formula__input" contenteditable spellcheck="false"></div>
    `;
  }
}
