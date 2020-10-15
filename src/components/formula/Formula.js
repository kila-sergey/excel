import {ExcelComponent} from '../../core/ExcelComponent';

import {FORMULA_INPUT, FORMULA_DONE, CELL_SELECT, CELL_INPUT} from '../../constants/listeners.constants';
import {isEnterPressed} from '../../helpers/formula.helpers';
import {$} from '../../core/dom-helper';
export class Formula extends ExcelComponent {
  static className = 'formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  toHtml() {
    return `
      <div class="formula__mark">fx</div>
      <div class="formula__input" contenteditable spellcheck="false" data-type="formula"></div>
    `;
  }

  init() {
    super.init();
    const $formula = this.$root.find('[data-type="formula"]');
    this.$on(CELL_SELECT, (text) => $formula.text(text));
    this.$on(CELL_INPUT, (text) => $formula.text(text));
  }

  onInput(e) {
    this.$emit(FORMULA_INPUT, $(e.target).text());
  }

  onKeydown(e) {
    if (isEnterPressed(e)) {
      e.preventDefault();
      this.$emit(FORMULA_DONE);
    }
  }
}
