import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {shouldResize} from '../../helpers/table.helpers';

export class Table extends ExcelComponent {
  static className = 'table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'mouseup'],
    });
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      resizeHandler(e, this.$root);
    }
  }

  onMouseup() {
  }

  toHtml() {
    return createTable(40);
  }
}


