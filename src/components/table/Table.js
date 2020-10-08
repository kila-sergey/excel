import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {shouldResize} from '../../helpers/table.helpers';
import TableSelection from './TableSelection';

export class Table extends ExcelComponent {
  static className = 'table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'mouseup'],
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const selectedCell = this.$root.find('[data-id="0-0"]');
    this.selection.select(selectedCell);
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


