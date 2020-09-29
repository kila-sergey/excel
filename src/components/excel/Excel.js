import {$} from '@core/dom-helper';
export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
  }

  getRoot(className) {
    const $root = $.createEl('div', className);

    this.components = this.components.map((Component)=>{
      const $el = $.createEl('div', Component.className);
      const component = new Component($el);
      $el.html(component.toHtml());
      $root.append($el);
      return component;
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot('excel'));
    this.components.forEach((component)=>console.log(component.__proto__));
  }
}
