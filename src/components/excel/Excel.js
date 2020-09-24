import {$} from '@core/dom-helper';
export class Excel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.components = options.components || [];
  }

  getRoot(className) {
    const $root = $.createEl('div', className);

    this.components.forEach((Component)=>{
      const $el = $.createEl('div', Component.className);
      const component = new Component($el);
      $el.innerHTML = component.toHtml();
      $root.append($el);
    });

    return $root;
  }

  render() {
    this.$el.appendChild(this.getRoot('excel'));
  }
}
