import {SELECTED_CELL_CLASS} from '../../constants/table.constants';

class TableSelection {
  constructor() {
    this.selected = [];
  }

  select($el) {
    this.selected.push($el);
    $el.addClass(SELECTED_CELL_CLASS);
  }

  selectGroup() {

  }
}

export default TableSelection;
