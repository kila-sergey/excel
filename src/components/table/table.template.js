import {CODES} from '../../constants/constants';

const createRow = (rowNumber, content) => {
  return `
    <div class="row" data-type="resizable" data-row=${rowNumber}>
      <div class="row-info">
        ${rowNumber ? rowNumber : ''}
        ${rowNumber ?
          `<div class="row__resize" data-resize="row">
            <div class="row__resize-toggler" data-resizer="row"></div>
          </div>` : ''}
      </div>
      <div class="row-data">
        ${content}
      </div>
    </div>
  `;
};

const createCol = (char, number) => {
  return `
    <div class="column" data-type="resizable" data-col=${number}>
      ${char}
      <div class="column__resize" data-resize="col"></div>
    </div>
  `;
};

const createCell = (colNumber, rowNumber) => {
  return `
    <div class="cell" contenteditable data-col=${colNumber} data-id="${colNumber}-${rowNumber}" data-type="cell"></div>
  `;
};

const createChar = (charCode) => {
  return String.fromCharCode(charCode);
};

export const createTable = (rowsCount = 15) => {
  const colsCount = CODES.Z - CODES.A + 1;
  const rowsArray = [];

  const cols = new Array(colsCount)
      .fill('')
      .map((_, id)=>createChar(CODES.A + id))
      .map((char, id)=>createCol(char, id))
      .join('');

  rowsArray.push(createRow(null, cols));

  for (let row=0; row<rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map((_, col) =>createCell(col, row))
        .join('');
    rowsArray.push(createRow(row+1, cells));
  }

  return rowsArray.join('');
};
