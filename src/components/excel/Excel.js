import {$} from '@core/dom-helper';
export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
  }

  getRoot(className) {
    const $root = $.createEl('div', className);

    this.components.forEach((Component)=>{
      const $el = $.createEl('div', Component.className);
      const component = new Component($el);
      $el.html(component.toHtml());
      $root.append($el);
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot('excel'));
  }
}
