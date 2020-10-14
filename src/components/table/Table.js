import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {
  shouldResize, shouldSelect, shouldSelectGroup, shouldSelectMultiple,
  shouldSelectByKeyPress, shouldSelectByShiftTab, cellsMatrix, getNextIdByKeycode,
} from '../../helpers/table.helpers';
import TableSelection from './TableSelection';
import {$} from '../../core/dom-helper';
export class Table extends ExcelComponent {
  static className = 'table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...options,
    });
    this.rowsLength = 40;
    this.colsLength = 26;
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const selectedCell = this.$root.find('[data-id="0-0"]');
    this.selection.select(selectedCell);
    this.emiter.subscribe('formula_check', (text)=>this.selection.current.text(text));
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
    if (shouldSelectByKeyPress(e)) {
      e.preventDefault();
      const nextId = getNextIdByKeycode($target.id(true), e.keyCode, this.rowsLength, this.colsLength);
      const $nextTarget = this.$root.find(`[data-id="${nextId}"]`);
      this.selection.select($nextTarget);
    }
    if (shouldSelectByShiftTab(e)) {
      e.preventDefault();
      const nextId = getNextIdByKeycode($target.id(true), e.keyCode, this.rowsLength, this.colsLength, true);
      const $nextTarget = this.$root.find(`[data-id="${nextId}"]`);
      this.selection.select($nextTarget);
    }
  }

  toHtml() {
    return createTable(this.rowsLength, this.colsLength);
  }
}
