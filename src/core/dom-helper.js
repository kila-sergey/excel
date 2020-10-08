class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'?
    document.querySelector(selector) :
    selector;
  }

  addClass(className) {
    this.$el.classList.add(className);
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

  css(cssObject={}) {
    Object.keys(cssObject).forEach(((property)=>{
      this.$el.style[property]=cssObject[property];
    }));
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  clear() {
    this.html('');
    return this;
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  findAll(selector) {
    const items = [];
    this.$el.querySelectorAll(selector).forEach((item)=>items.push($(item)));
    return items;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    } else {
      return this.$el.outerHTML.trim();
    }
  }

  on(eventName, callback) {
    this.$el.addEventListener(eventName, callback);
  }

  off(eventName, callBack) {
    this.$el.removeEventListener(eventName, callBack);
  }

  removeClass(className) {
    if (this.$el.classList.contains(className)) {
      this.$el.classList.remove(className);
    }
  }

  getCords() {
    return this.$el.getBoundingClientRect();
  }

  get data() {
    return this.$el.dataset;
  }

  get style() {
    return this.$el.style;
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
