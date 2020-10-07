import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {$} from '../../core/dom-helper';

import {RESIZABLE_TYPES, DEFAULT_RESIZER_OFFSET} from '../../constants/constants';
export class Table extends ExcelComponent {
  static className = 'table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'mouseup'],
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

      let totalSize;

      $target.addClass('visible');


      document.onmousemove = (e) => {
        const delta = e[isColumn ? 'pageX' : 'pageY'] - cords[isColumn ? 'right' : 'bottom'];
        $target.css(isColumn?
          {right: `${DEFAULT_RESIZER_OFFSET - delta}px`} :
          {bottom: `${DEFAULT_RESIZER_OFFSET - delta}px`});
        totalSize = delta + cords[isColumn ? 'width' : 'height'];
      };

      document.onmouseup = () => {
        $target.removeClass('visible');
        $target.css(isColumn?
          {right: `${DEFAULT_RESIZER_OFFSET}px`} :
          {bottom: `${DEFAULT_RESIZER_OFFSET}px`});
        resizableElements.forEach((item)=>item.css(isColumn?
          {width: `${totalSize}px`}:
          {height: `${totalSize}px`}));
        document.onmousemove = null;
      };
    }
  }

  onMouseup() {
  }

  toHtml() {
    return createTable(40);
  }
}


