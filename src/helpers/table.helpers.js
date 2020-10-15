import {KEY_CODES} from '../constants/constants';

export const shouldResize = (e) => {
  return !!e.target.dataset.resize;
};

export const shouldSelect = (e) => {
  return e.target.dataset.type === 'cell';
};

export const shouldSelectGroup = (e) => {
  return e.shiftKey === true;
};

export const shouldSelectMultiple = (e) => {
  return e.ctrlKey === true;
};

export const shouldSelectByKeyPress = (e) => {
  const keys = [KEY_CODES.UP, KEY_CODES.DOWN, KEY_CODES.LEFT, KEY_CODES.RIGHT, KEY_CODES.ENTER, KEY_CODES.TAB];
  return keys.includes(e.keyCode) && e.shiftKey === false;
};

export const shouldSelectByShiftTab = (e) => {
  return e.keyCode === KEY_CODES.TAB && e.shiftKey === true;
};

export const getNextIdByKeycode = ({col, row}, keyCode, rowsLength, colsLength, isShiftPressed = false) => {
  switch (keyCode) {
    case KEY_CODES.TAB:
      if (isShiftPressed) {
        col = col-1 < 0 ? 0 : col - 1;
        break;
      }
      col = col + 1 > (colsLength - 1) ? (colsLength - 1) : (col + 1);
      break;
    case KEY_CODES.RIGHT:
      col = col + 1 > (colsLength - 1) ? (colsLength - 1) : (col + 1);
      break;
    case KEY_CODES.LEFT:
      col = col-1 < 0 ? 0 : col - 1;
      break;
    case KEY_CODES.ENTER:
    case KEY_CODES.DOWN:
      row = row + 1 > (rowsLength - 1) ? (rowsLength - 1) : (row + 1);
      break;
    case KEY_CODES.UP:
      row = row - 1 < 0 ? 0 : row - 1;
  }
  return `${col}-${row}`;
};

export const cellsMatrix = ($currentTargetId, $targetId, $root) => {
  const colsRange = range($targetId.col, $currentTargetId.col);
  const rowsRange = range($targetId.row, $currentTargetId.row);

  const ids = rowsRange.reduce((acc, row)=>{
    colsRange.forEach((col)=>acc.push(`${col}-${row}`));
    return acc;
  }, []);

  const cellsToSelect = ids.map((id)=>{
    return $root.find(`[data-id="${id}"]`);
  });

  return cellsToSelect;
};

export const range = (start, end) => {
  if (start > end) {
    [end, start] = [start, end];
  }
  const range = new Array(end - start + 1)
      .fill('')
      .map((_, id)=>start + id);
  return range;
};
