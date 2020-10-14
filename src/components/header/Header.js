import {ExcelComponent} from '../../core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options,
    });
  }

  toHtml() {
    return `
      <input type="text" class="header__input" value="Новая таблица" />
      <div>
          <button class="header__button">
            <i class="material-icons">delete</i>
          </button>
          <button class="header__button">
            <i class="material-icons">exit_to_app</i>
          </button>
      </div>
    `;
  }
}
