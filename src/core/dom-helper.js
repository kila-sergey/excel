class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'?
    document.querySelector(selector) :
    selector;
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this.$el;
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

  id(shouldParse) {
    if (shouldParse) {
      const id= this.id().split('-');
      return {
        col: +id[0],
        row: +id[1],
      };
    }
    return this.data.id;
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  findAll(selector) {
    const items = [];
    this.$el.querySelectorAll(selector).forEach((item)=>items.push($(item)));
    return items;
  }

  focus() {
    this.$el.focus();
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    } else {
      return this.$el.outerHTML.trim();
    }
  }

  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text;
      return this;
    } else {
      return this.$el.textContent;
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
    return this.$el;
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
