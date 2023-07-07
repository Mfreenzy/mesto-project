import {Popup} from './Popup.js'

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupTextbox = this._popup.querySelector('.popup__textbox_card-textbox');
    this._popupImage = this._popup.querySelector('.popup__image_card-image')
  }

  open({title, link}) {
    this._popupTextbox.textContent = title;
    this._popupImage.src = link;
    this._popupImage.alt = title;
    super.open()
  }
}