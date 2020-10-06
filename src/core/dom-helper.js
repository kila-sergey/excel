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
      this.$el.appendChild(node);
    }
  }

  on(eventName, callback) {
    this.$el.addEventListener(eventName, callback);
  }

  off(eventName, callBack) {
    this.$el.removeEventListener(eventName, callBack);
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
