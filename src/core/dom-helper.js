class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'?
    document.querySelector(selector) :
    selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    } else {
      return this.$el.outerHTML.trim();
    }
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChi; ld(node);
    }
  }

  on(eventName, callback) {
    this.$el.addEventListener(eventName, callback);
  }

  off(eventName, callBack) {
    this.$el.removeEventListener(eventName, callBack);
  }

  get style() {
    return this.$el.style;
  }

  css(cssObject={}) {
    Object.keys(cssObject).forEach(((property)=>{
      this.$el.style[property]=cssObject[property];
    }));
  }

  get data() {
    return this.$el.dataset;
  }

  findAll(selector) {
    const items = [];
    this.$el.querySelectorAll(selector).forEach((item)=>items.push($(item)));
    return items;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCords() {
    return this.$el.getBoundingClientRect();
  }

  clear() {
    this.html('');
    return this;
  }
}
export function $(selector) {
  return new Dom(selector);
}

$.createEl = (tag = 'div', classes = '') => {
  const el = document.createElement(tag);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
