import {$} from '@core/dom-helper';
export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
  }

  // Get html template
  getRoot(className) {
    const $root = $.createEl('div', className);

    this.components = this.components.map((Component)=>{
      const $el = $.createEl('div', Component.className);
      const component = new Component($el);

      // Debug
      window[`c${component.name}`] = component;
      //

      $el.html(component.toHtml());
      $root.append($el);
      return component;
    });

    return $root;
  }

  // Render the html-template
  render() {
    this.$el.append(this.getRoot('excel'));
    this.components.forEach((component)=>component.init());
  }
}
