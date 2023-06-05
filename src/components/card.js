import { openPopup, closePopup } from "./modal";

const elementTitle = document.querySelector(".element__title");
const elementImage = document.querySelector(".element__image");
const elementTemplate = document.querySelector("#element-image").content;
const crdPopup = document.querySelector(".popup_card-popup");
const crdPopupContainer = document.querySelector(".popup__container_card-zoom-container");
const crdPopupButton = document.querySelector(".popup__close_card-close");
const crdPopupImage = document.querySelector(".popup__image_card-image");
const crdPopupTitle = document.querySelector(".popup__textbox_card-textbox");
const elementsContainer = document.querySelector(".elements");
const addNameInput = document.querySelector(".popup__input_text_ad-name");
const addLink = document.querySelector(".popup__input_text__ad-link");
const addPopup = document.querySelector(".popup_add-popup");
const addPopupContainer = document.querySelector(".popup__container_add-container");


function createElement(elementTitle, elementImage) {
    const newElement = elementTemplate.querySelector(".element").cloneNode(true);
    const newElementName = newElement.querySelector(".element__title");
    const newElementImage = newElement.querySelector(".element__image");
    const deleteButton = newElement.querySelector(".element__delete");
    const likeButton = newElement.querySelector(".element__like");
  
    newElementName.textContent = elementTitle;
    newElementImage.src = elementImage;
    newElementImage.alt = elementTitle;
  
    likeButton.addEventListener("click", function (evt) {
        evt.target.classList.toggle("element__like_active");
    });
  
    deleteButton.addEventListener("click", function () {
        const newElement = deleteButton.closest(".element");
        newElement.remove();
    });
  
    newElementImage.addEventListener("click", () => {
        openPopup(crdPopup);
        crdPopupTitle.textContent = elementTitle;
        crdPopupImage.src = elementImage;
        crdPopupImage.alt = elementTitle;
    });
  
    return newElement;
  }
  
export function addElementsContainer(elementsContainer, newElementName, newElementImage) {
    const newElement = createElement(newElementName, newElementImage);
    elementsContainer.prepend(newElement);
  }

  export function addFormSubmit(evt) {
    evt.preventDefault();
    addElementsContainer(elementsContainer, addNameInput.value, addLink.value);
    closePopup(addPopup);
    evt.target.reset();
  }

export {elementsContainer, addPopup}