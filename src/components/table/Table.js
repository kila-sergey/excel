import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {$} from '../../core/dom-helper';

import {RESIZABLE_TYPES} from '../../constants/constants';
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
      const $resizableRoot = $target.closest('[data-type="resizable"]');
      const isColumn = $target.data.resize === RESIZABLE_TYPES.COL;
      const resizableNumber= isColumn ? $resizableRoot.data.col : $resizableRoot.data.row;
      const cords = $resizableRoot.getCords();
      const resizableElements = this.$root.findAll(`[data-${isColumn ? 'col' : 'row'}="${resizableNumber}"]`);

      document.onmousemove = (e) => {
        const delta = e[isColumn ? 'pageX' : 'pageY'] - cords[isColumn ? 'right' : 'bottom'];
        const totalSize = delta + cords[isColumn ? 'width' : 'height'];
        resizableElements.forEach((item)=>item.style[isColumn ? 'width' : 'height'] = `${totalSize}px`);
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

// 314 msScripting
// 3898 msRendering
