import { Popup } from './popup.js'

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupTextbox = this._popup.querySelector('.popup__textbox');
        this._popupImage = this._popup.querySelector('.popup__image')
    }

    open(textbox, image){
        this._popupTextbox.textContent = textbox;
        this._popupImage.src = image;
        this._popupImage.alt = textbox;
        super.open()
    }
}