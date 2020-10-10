export const shouldResize = (e) => {
  return !!e.target.dataset.resize;
};

export const shouldSelect = (e) => {
  return e.target.dataset.type === 'cell';
};

export const shouldSelectGroup = (e) => {
  return e.target.dataset.type === 'cell' && e.shiftKey === true;
};
