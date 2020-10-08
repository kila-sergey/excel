import {$} from '../../core/dom-helper';
import {RESIZABLE_TYPES, MIN_COLUMN_WIDTH, MIN_ROW_HEIGHT} from '../../constants/table.constants';

export const resizeHandler = (e, $root) => {
  const $resizer = $(e.target);
  const $resizableRoot = $resizer.closest('[data-type="resizable"]');
  const isColumn = $resizer.data.resize === RESIZABLE_TYPES.COL;
  const resizableNumber= isColumn ? $resizableRoot.data.col : $resizableRoot.data.row;
  const cords = $resizableRoot.getCords();
  const resizableElements = $root.findAll(`[data-${isColumn ? 'col' : 'row'}="${resizableNumber}"]`);
  let totalSize = cords[isColumn? 'width' : 'height'];

  $resizer.addClass('visible');

  document.onmousemove = (e) => {
    const delta = e[isColumn ? 'pageX' : 'pageY'] - cords[isColumn ? 'right' : 'bottom'];
    totalSize = delta + cords[isColumn ? 'width' : 'height'];
    $resizableRoot.css(isColumn?
      {width: `${totalSize}px`}:
      {height: `${totalSize}px`});
  };

  document.onmouseup = () => {
    $resizer.removeClass('visible');
    resizableElements.forEach((item)=>item.css(isColumn?
      {width: `${totalSize>=MIN_COLUMN_WIDTH ? totalSize : MIN_COLUMN_WIDTH}px`}:
      {height: `${totalSize>=MIN_ROW_HEIGHT ? totalSize : MIN_ROW_HEIGHT}px`}));

    document.onmousemove = null;
    document.onmouseup = null;
  };
};
