import {ExcelComponent} from '../../core/ExcelComponent';

export class Toolbar extends ExcelComponent {
  static className = 'toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options,
    });
  }

  toHtml() {
    return `
      <button class="toolbar__button">
          <i class="material-icons">format_align_left</i>
        </button>
        <button class="toolbar__button">
          <i class="material-icons">format_align_center</i>
        </button>
        <button class="toolbar__button">
          <i class="material-icons">format_align_right</i>
        </button>
        <button class="toolbar__button">
          <i class="material-icons">format_bold</i>
        </button>
        <button class="toolbar__button">
          <i class="material-icons">format_italic</i>
        </button>
        <button class="toolbar__button">
          <i class="material-icons">format_underlined</i> 
      </button>
    `;
  }

  onClick() {
    console.log('click', this.name);
  }
}
