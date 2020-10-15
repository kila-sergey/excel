import {$} from '@core/dom-helper';
import Emiter from '../../core/Emiter';
export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.emiter = new Emiter();
  }

  // Get html template
  getRoot(className) {
    const $root = $.createEl('div', className);

    this.components = this.components.map((Component)=>{
      const $el = $.createEl('div', Component.className);
      const component = new Component($el, {
        emiter: this.emiter,
      });

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
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.components.forEach((component) => component.destroy());
  }
}
