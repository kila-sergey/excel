import {ExcelComponent} from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['click', 'input'],
      ...options,
    });
  }

  toHtml() {
    return `
      <div class="formula__mark">fx</div>
      <div class="formula__input" contenteditable spellcheck="false"></div>
    `;
  }

  onClick(e) {
    console.log('click', this.name);
  }

  onInput(e) {
    const text = e.target.textContent;
    this.emiter.emit('formula_check', text);
  }
}
