import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
export class Table extends ExcelComponent {
  static className = 'table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }

  onMousedown(e) {
    if (e.target.dataset.resize) {
      console.log('resize', e.target.dataset.resize);
    }
  }

  onMouseup() {
    console.log('mouseup');
  }

  toHtml() {
    return createTable(40);
  }
}
