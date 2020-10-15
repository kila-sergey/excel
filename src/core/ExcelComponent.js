import {DomListener} from './DomListener';
export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emiter = options.emiter;
    this.unsubscribers = [];

    this.prepare();
  }

  prepare() {}

  toHtml() {
    return '';
  }

  init() {
    this.initDomListeners();
  }

  $emit(eventName, ...args) {
    this.emiter.emit(eventName, ...args);
  }

  $on(eventName, fn) {
    const unsubscribe = this.emiter.subscribe(eventName, fn);
    this.unsubscribers.push(unsubscribe);
  }

  destroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}

