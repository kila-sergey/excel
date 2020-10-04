import {getMethodName} from './utils';
export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No root was provided to DomListener');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDomListeners() {
    this.listeners.forEach((event)=>{
      const methodName = getMethodName(event);
      if (!this[methodName]) {
        throw new Error(
            `${methodName} not implemented in ${this.name} component`
        );
      }
      this[methodName] = this[methodName].bind(this);
      // Add event listener
      this.$root.on(event, this[methodName]);
    });
  }

  removeDomListeners() {
    this.listeners.forEach((event)=>{
      const methodName = getMethodName(event);
      this.$root.off(event, this.[methodName]);
    });
  }
}
