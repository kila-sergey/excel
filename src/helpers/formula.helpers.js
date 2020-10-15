import {KEY_CODES} from '../constants/constants';

export const isEnterPressed = (e) => {
  const keys = [KEY_CODES.ENTER, KEY_CODES.TAB];
  return keys.includes(e.keyCode);
};
