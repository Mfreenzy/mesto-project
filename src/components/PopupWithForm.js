import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
    constructor(popupSelector, { callbackFormSubmit }) {
        super(popupSelector);
        this._callbackFormSubmit = callbackFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__name');
        this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
        this._subButton = this._popup.querySelector('.popup__submit');
        this._subButtonText = this._subButton.textContent;
    }

// Метод сборки данных всех полей формы 

    _getInputValues() {
        this.formValues = {};
        this._inputList.forEach(inputItem => {
            this.formValues[inputItem.name] = inputItem.value;
        });
        return this.formValues;
    }

// Метод setEventListeners, связь с _getInputValues

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbackFormSubmit(this._getInputValues());
          });
        }
// Метод добавления кнопке текста в момент сохранения

    putStatusOnButton() {
          this._subButton.textContent = 'Сохранение...';
        }

 // Метод добавления стандартного текста кнопке

    returnStatusOnButton() {
          this._subButton.textContent = this._subButtonText;
        }

// Метод закрытия popup (перезаписывает родителя)

    close() {
          super.close();
          this._popupForm.reset();
        }
}