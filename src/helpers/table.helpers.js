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

export const shouldSelectLeft = (e) => {
  return e.keyCode === KEY_CODES.LEFT || (e.keyCode === KEY_CODES.TAB && e.shiftKey === true);
};

export const shouldSelectRight = (e) => {
  return e.keyCode === KEY_CODES.RIGHT || (e.keyCode === KEY_CODES.TAB && e.shiftKey === false);
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
