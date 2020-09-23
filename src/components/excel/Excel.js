export class Excel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = document.createElement('div');

    this.components.forEach((Component)=>{
      const component = new Component();
      $root.insertAdjacentHTML('beforeend', component.toHtml());
    });

    return $root;
  }

  render() {
    this.$el.appendChild(this.getRoot());
  }
}
