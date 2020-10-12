import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {
  shouldResize, shouldSelect, shouldSelectGroup, shouldSelectMultiple,
  shouldSelectLeft, shouldSelectRight, cellsMatrix,
} from '../../helpers/table.helpers';
import TableSelection from './TableSelection';
import {$} from '../../core/dom-helper';
export class Table extends ExcelComponent {
  static className = 'table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
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
      } else if (shouldSelectMultiple(e)) {
        this.selection.selectMultiple($target);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(e) {
    const $target = this.selection.current;
    if (shouldSelectLeft(e)) {
      e.preventDefault();
      const currentTargetRow = $target.id(true).row;
      const currentTargetCol = $target.id(true).col === 0 ? $target.id(true).col : $target.id(true).col - 1;
      const currentTargetId = `${currentTargetCol}-${currentTargetRow}`;
      const $currentTarget = this.$root.find(`[data-id="${currentTargetId}"]`);
      this.selection.select($currentTarget);
    }
    if (shouldSelectRight(e)) {
      e.preventDefault();
      const currentTargetRow = $target.id(true).row;
      const currentTargetCol = $target.id(true).col === 0 ? $target.id(true).col : $target.id(true).col + 1;
      const currentTargetId = `${currentTargetCol}-${currentTargetRow}`;
      const $currentTarget = this.$root.find(`[data-id="${currentTargetId}"]`);
      this.selection.select($currentTarget);
    }
  }

  toHtml() {
    return createTable(40);
  }
}


