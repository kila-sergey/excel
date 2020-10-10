import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {shouldResize, shouldSelect, shouldSelectGroup} from '../../helpers/table.helpers';
import TableSelection from './TableSelection';
import {$} from '../../core/dom-helper';
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
    if (shouldSelect(e)) {
      const $selectable = $(e.target);
      this.selection.select($selectable);
    }
    if (shouldSelectGroup(e)) {
      console.log('select');
    }
  }

  onMouseup() {
  }

  toHtml() {
    return createTable(40);
  }
}


