export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No root was provided to DomListener');
    }
    this.root = $root;
    this.listeners = listeners;
  }

  initDomListeners() {
    console.log(this.listeners);
  }

  removeDomListeners() {

  }
}
