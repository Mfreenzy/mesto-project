export class Section {

  constructor(containerSelector, renderer) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem({element, isReverse= false}) {
    isReverse ? this._container.prepend(element) : this._container.append(element);
  }

  renderItem(item, myId) {
    this._renderer(item, myId);
    }

  renderItems(arrItems, myId) {
    arrItems.forEach(item => {
      this.renderItem(item, myId);
    });
  }
}