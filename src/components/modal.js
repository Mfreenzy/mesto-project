export const popupElement = document.querySelector(".popup");

function closeByEsc(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup); 
    }
}

function closeByOvr(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target);
    }

}

export function openPopup(popupElement) {
    popupElement.classList.add("popup_opened");
    document.addEventListener('keydown', closeByEsc)
    popupElement.addEventListener('click', closeByOvr)
}

export function closePopup(popupElement) {
    popupElement.classList.remove("popup_opened");
    document.removeEventListener('keydown', closeByEsc)
    popupElement.removeEventListener('keydown', closeByOvr)
}


