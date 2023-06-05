
export function clearErrorText() {
    const errorRecord = document.querySelectorAll(".popup__input-error")
    errorRecord.forEach((error) => {
      error.textContent = ""
    }) 
   }
  
export function clearInputError() {
    const inputList = document.querySelectorAll(".popup__input");
    inputList.forEach((inputSelector) => {
      inputSelector.classList.remove('popup__input_type_error')
    }
  )}
