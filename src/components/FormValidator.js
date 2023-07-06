export class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
        this._submitButton = this._formElement.querySelector(this._settings.submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    }

    // Метод отображения ошибок валидации.

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settings.errorClass);
    }

    // Метод скрытия ошибок валидации

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = "";
    }

    // Метод сброса валидации форм
    checkErrorForm() {
        this._inputList.forEach((inputItem) => {
            this._checkInputValidity(inputItem);
        });
      this._toggleButtonState();
    }


    resetValidate() {
        this._inputList.forEach((inputItem) => {
            this._hideInputError(inputItem);
        });
        this._toggleButtonState();
    }

    // Метод проверки валидации форм

    _checkInputValidity(inputElement) {
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
            inputElement.setCustomValidity("");
        }
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    // Метод проверки всех input

    _setEventListeners() {

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input",  () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    // Метод обхода input-ов на ошибки

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    // Публичный метод, который включает валидацию форм 

    enableValidation() {
        this._formElement.addEventListener('submit', (e) => e.preventDefault());
        this._setEventListeners();
    }

    // Метод выключения кнопки submit 

    _disableSubmitButton() {
        this._submitButton.setAttribute('disabled', 'true');
        this._submitButton.classList.add(this._settings.inactiveButtonClass); 
    }

    // Метод включения кнопки submit 

    _enableSubmitButton() {
        this._submitButton.classList.remove(this._settings.inactiveButtonClass);
        this._submitButton.removeAttribute('disabled');
    }

    // Метод активации submit 

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._disableSubmitButton()
        } else {
            this._enableSubmitButton()
        }
    }
}
