export class Section {

  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem({element, isReverse= false}) {
    isReverse ? this._container.prepend(element) : this._container.append(element);
  }

  _clear() {
    this._container.innerHTML = '';
  }

  renderItems() {
    this._clear();
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}
