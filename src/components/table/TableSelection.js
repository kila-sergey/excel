import {SELECTED_CELL_CLASS} from '../../constants/table.constants';

class TableSelection {
  constructor() {
    this.selected = [];
    this.current = null;
  }

  select($el) {
    this.clear();
    this.selected.push($el);
    $el.addClass(SELECTED_CELL_CLASS);
    this.current = $el;
  }

  selectGroup(elementsArray) {
    this.clear();
    this.selected = [...this.selected, ...elementsArray];
    this.selected.forEach(($el) => $el.addClass(SELECTED_CELL_CLASS));
  }

  clear() {
    this.selected.forEach(($el)=>$el.removeClass(SELECTED_CELL_CLASS));
    this.selected = [];
  }
}

export default TableSelection;
