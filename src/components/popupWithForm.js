import { Popup } from './popup.js'

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
        this._formValues = {};
        this._inputList.forEach(inputItem => {
            this._formValues[inputItem.name] = inputItem.value;
        });
        return this._formValues;
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

    putSavingProcessText() {
          this._subButton.textContent = 'Сохранение...';
        }

 // Метод добавления стандартного текста кнопке

    returnSavingProcessText() {
          this._subButton.textContent = this._submitButtonText;
        }

// Метод закрытия popup (перезаписывает родителя)

    close() {
          super.close();
          this._popupForm.reset();
        }
}