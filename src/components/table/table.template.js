import {CODES} from '../../constants/constants';

const createRow = (rowNumber, content) => {
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${rowNumber ? rowNumber : ''}
        ${rowNumber ? '<div class="row__resize" data-resize="row"></div>' : ''}
      </div>
      <div class="row-data">
        ${content}
      </div>
    </div>
  `;
};

const createCol = (char) => {
  return `
    <div class="column" data-type="resizable">
      ${char}
      <div class="column__resize" data-resize="col"></div>
    </div>
  `;
};

const createCell = () => {
  return `
    <div class="cell" contenteditable></div>
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
      .map((char)=>createCol(char))
      .join('');

  const cells = new Array(colsCount)
      .fill('')
      .map((_, id) =>createCell())
      .join('');

  rowsArray.push(createRow(null, cols));

  for (let i=0; i<rowsCount; i++) {
    rowsArray.push(createRow(i+1, cells));
  }

  return rowsArray.join('');
};
