class Dom {
}

export const $ = new Dom();

$.createEl = (tag = 'div', classes = '') => {
  const el = document.createElement(tag);
  if (classes) {
    el.classList.add(classes);
  }
  return el;
};
