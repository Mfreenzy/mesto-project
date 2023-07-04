export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)

  }

// Метод закрытия модального окна по клавише Esc
  _handleEscUp = (evt) => {
    if (evt.key === 'Escape') {
      this.close()
    }
  }

// Метод открытия модального окна
  open() {
    this._popup.classList.add("popup_opened")
    document.addEventListener('keyup', this._handleEscUp)
  }

// Метод закрытитя модального окна
  close() {
    this._popup.classList.remove("popup_opened")
    document.removeEventListener('keyup', this._handleEscUp)
  }

// Метод закрытия popup по клику за область формы (включая крестик)
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      debugger
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        this.close()
      }
    })
  }
}