import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {shouldResize, shouldSelect, shouldSelectGroup, cellsMatrix} from '../../helpers/table.helpers';
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
      const $target = $(e.target);
      if (shouldSelectGroup(e)) {
        const $currentTargetId = this.selection.current.id(true);
        const $targetId = $target.id(true);

        const cellsToSelect = cellsMatrix($currentTargetId, $targetId, this.$root);

        this.selection.selectGroup(cellsToSelect);
      } else {
        this.selection.select($target);
      }
    }
  }

  onMouseup() {
  }

  toHtml() {
    return createTable(40);
  }
}


const range = (start, end) => {
  if (start > end) {
    [end, start] = [start, end];
  }
  const range = new Array(end - start + 1)
      .fill('')
      .map((_, id)=>start + id);
  return range;
};
