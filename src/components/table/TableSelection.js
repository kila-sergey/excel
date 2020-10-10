import {SELECTED_CELL_CLASS} from '../../constants/table.constants';

class TableSelection {
  constructor() {
    this.selected = [];
  }

  select($el) {
    this.clear();
    this.selected.push($el);
    $el.addClass(SELECTED_CELL_CLASS);
  }

  selectGroup() {

  }
  clear() {
    this.selected.forEach(($el)=>$el.removeClass(SELECTED_CELL_CLASS));
    this.selected = [];
  }
}

export default TableSelection;
