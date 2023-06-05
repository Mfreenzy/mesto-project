const showInputError = (formSelector, inputSelector, errorMessage) => {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
  };
  
  const hideInputError = (formSelector, inputSelector) => {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
  };
  
  
  const checkInputValidity = (formSelector, inputSelector) => {
    if (inputSelector.validity.patternMismatch) {
      // данные атрибута доступны у элемента инпута через ключевое слово dataset.
      // обратите внимание, что в js имя атрибута пишется в camelCase (да-да, в
      // HTML мы писали в kebab-case, это не опечатка)
    inputSelector.setCustomValidity(inputSelector.dataset.errorMessage);
  } else {
    inputSelector.setCustomValidity("");
  }
    if (!inputSelector.validity.valid) {
      showInputError(formSelector, inputSelector, inputSelector.validationMessage);
    } else {
      hideInputError(formSelector, inputSelector);
    }
  };
  
  const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputSelector) => {
          // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
  
      return !inputSelector.validity.valid;
    })
  };
  
export const toggleButtonState = (inputList, submitButtonSelector) => {
    
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      submitButtonSelector.classList.add('popup__submit_invalid');
      submitButtonSelector.disabled = true;
    } else {
          // иначе сделай кнопку активной
          submitButtonSelector.classList.remove('popup__submit_invalid');
          submitButtonSelector.disabled = false;
    }
  }; 
  
  
  const setEventListeners = (formSelector) => {
    const inputList = Array.from(formSelector.querySelectorAll('.popup__input'));
    const submitButtonSelector = formSelector.querySelector('.popup__submit');
    inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', function () {
        checkInputValidity(formSelector, inputSelector);
        toggleButtonState(inputList, submitButtonSelector);
      });
    });
  };
  
  
export function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__name'));
    formList.forEach((formSelector) => {
      formSelector.addEventListener('submit', (evt) => {
        evt.preventDefault() 
      })
      setEventListeners(formSelector);
    
        })
      };