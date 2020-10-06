import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {$} from '../../core/dom-helper';
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
      const $target = $(e.target);
      const $resizable = $target.closest('[data-type="resizable"]');
      const cords = $resizable.getCords();
      document.onmousemove = (e) => {
        const delta = e.pageX - cords.right;
        const width = delta + cords.width;
        $resizable.$el.style.width = `${width}px`;
      };
      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }

  onMouseup() {
    console.log('mouseup');
  }

  toHtml() {
    return createTable(40);
  }
}
