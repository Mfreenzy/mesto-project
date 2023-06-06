const popupElement = document.querySelector(".popup");


export function openPopup(popupElement) {
    popupElement.classList.add("popup_opened");
}

export function closePopup(popupElement) {
    popupElement.classList.remove("popup_opened");
}


