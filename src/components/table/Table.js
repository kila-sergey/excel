import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {
  shouldResize, shouldSelect, shouldSelectGroup, shouldSelectMultiple,
  shouldSelectByKeyPress, shouldSelectByShiftTab, cellsMatrix, getNextIdByKeycode,
} from '../../helpers/table.helpers';
import {FORMULA_INPUT, FORMULA_DONE, CELL_SELECT, CELL_INPUT} from '../../constants/listeners.constants';
import TableSelection from './TableSelection';
import {$} from '../../core/dom-helper';
export class Table extends ExcelComponent {
  static className = 'table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
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
    const $selectedCell = this.$root.find('[data-id="0-0"]');
    this.$on(FORMULA_INPUT, (text)=>this.selection.current.text(text));
    this.$on(FORMULA_DONE, () => this.selection.select(this.selection.current));
    this.selectCell($selectedCell);
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit(CELL_SELECT, $cell.text());
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
        this.selectCell($target);
      }
    }
  }

  onKeydown(e) {
    const $target = this.selection.current;
    if (shouldSelectByKeyPress(e)) {
      e.preventDefault();
      const nextId = getNextIdByKeycode($target.id(true), e.keyCode, this.rowsLength, this.colsLength);
      const $nextTarget = this.$root.find(`[data-id="${nextId}"]`);
      this.selectCell($nextTarget);
    }
    if (shouldSelectByShiftTab(e)) {
      e.preventDefault();
      const nextId = getNextIdByKeycode($target.id(true), e.keyCode, this.rowsLength, this.colsLength, true);
      const $nextTarget = this.$root.find(`[data-id="${nextId}"]`);
      this.selectCell($nextTarget);
    }
  }

  onInput(e) {
    this.$emit(CELL_INPUT, $(e.target).text());
  }

  toHtml() {
    return createTable(this.rowsLength, this.colsLength);
  }
}
