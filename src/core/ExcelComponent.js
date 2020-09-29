import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
  }
  // Return HTML-template of Component
  toHtml() {
    return '';
  }

  init() {
    this.initDomListeners();
  }
}

