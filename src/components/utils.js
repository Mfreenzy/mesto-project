
export function clearErrorText() {
    const errorRecord = document.querySelectorAll(".popup__input-error")
    errorRecord.forEach((error) => {
      error.textContent = ""
    }) 
   }
  

