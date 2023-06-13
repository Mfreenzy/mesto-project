   export function disableButton(buttonElement) {
    buttonElement.classList.add("popup__submit_invalid");
    buttonElement.disabled = true;
  }

  export function setStatusOnButton ({buttonElement, text, disabled}) {
  if (disabled) {
    buttonElement.disabled = 'disabled'
  } else {
    buttonElement.disabled = false;
  }

  buttonElement.textContent = text

  }