const popUp = document.querySelector(".popup");
const popupContainer = document.querySelector(".popup__container");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupClose = document.querySelector(".popup__close");
const elementsContainer = document.querySelector(".elements");
const formElement = document.querySelector(".popup__profile-name");
const nameInput = document.querySelector(".popup__input_text_ed-name");
const jobInput = document.querySelector(".popup__input_text_ed-prof");
const submitButton = document.querySelector(".popup__submit");
const profileName = document.querySelector(".profile__name");
const profileProf = document.querySelector(".profile__prof");
const addPopup = document.querySelector(".addPopup");
const addPopupContainer = document.querySelector(".addPopup__container");
const addButton = document.querySelector(".profile__add-button");
const addPopupClose = document.querySelector(".addPopup__close");
const formAddElement = document.querySelector(".addPopup__mesto-name");
const addNameInput = document.querySelector(".addPopup__input_text_ad-name");
const addLink = document.querySelector(".addPopup__input_text_ad-link");
const submitAddButton = document.querySelector(".addPopup__submit");
const elementTitle = document.querySelector(".element__title");
const elementImage = document.querySelector(".element__image");
const elementTemplate = document.querySelector("#element-image").content;

function popupOpened() {
    popUp.classList.add("popup_opened");
}

function popupClosed() {
    popUp.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProf.textContent = jobInput.value;
    popupClosed();
    evt.target.reset()
}

function addPopupOpened() {
    addPopup.classList.add("addPopup_opened");
}

function addPopupClosed() {
    addPopup.classList.remove("addPopup_opened");
}

function addFormSubmit(evt) {
    evt.preventDefault();
    addElementsContainer(elementsContainer, addNameInput.value, addLink.value);
    addPopupClosed();
    evt.target.reset()
}

function createElement(elementTitle, elementImage) {
    const newElement = elementTemplate.querySelector(".element").cloneNode(true);
    const newElementName = newElement.querySelector(".element__title");
    const newElementImage = newElement.querySelector(".element__image");
    const deleteButton = newElement.querySelector(".element__delete");
    const likeButton = newElement.querySelector(".element__like");
    const crdPopup = document.querySelector(".card-popup");
    const crdPopupButton = document.querySelector(".card-popup__close");
    const crdPopupImage = document.querySelector(".card-popup__image");
    const crdPopupTitle = document.querySelector(".card-popup__title");

    function crdPopupOpened() {
        crdPopup.classList.add("card-popup_opened");
    }

    function crdPopupClosed() {
        crdPopup.classList.remove("card-popup_opened");
    }

    newElementName.textContent = elementTitle;
    newElementImage.src = elementImage;
    newElementImage.alt = elementTitle;
    crdPopupImage.src = elementImage;
    crdPopupTitle.textContent = elementTitle;

    likeButton.addEventListener("click", function (evt) {
        evt.target.classList.toggle("element__like_active");
    });

    deleteButton.addEventListener("click", function () {
        const newElement = deleteButton.closest(".element");
        newElement.remove();
    });

    newElementImage.addEventListener("click", crdPopupOpened);
    crdPopupButton.addEventListener("click", crdPopupClosed);

    return newElement;
}

function addElementsContainer(elementsContainer, newElementName, newElementImage) {
    const newElement = createElement(newElementName, newElementImage);
    elementsContainer.prepend(newElement);
}

profileEditButton.addEventListener("click", popupOpened);
popupClose.addEventListener("click", popupClosed);
formElement.addEventListener("submit", handleFormSubmit);
addButton.addEventListener("click", addPopupOpened);
addPopupClose.addEventListener("click", addPopupClosed);
formAddElement.addEventListener("submit", addFormSubmit);
