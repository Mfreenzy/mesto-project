import { openPopup } from "./modal";
import { handleChangeLikeStatus, handleDeleteCard } from "..";

export { elementsContainer, addPopup };

export const isLiked = (likesArray, userID) => {
    return Boolean(
        likesArray.find((likeObj) => {
            return likeObj._id === userID;
        })
    );
};

export const updateLikeStatus = (newElement, likesArray, userID) => {
    const likeButton = newElement.querySelector(".element__like");
    const likesCounter = newElement.querySelector(".element__like-count");

    likesCounter.textContent = likesArray.length;

    if (isLiked(likesArray, userID)) {
        likeButton.classList.add("element__like_active");
    } else {
        likeButton.classList.remove("element__like_active");
    }
};

const elementTitle = document.querySelector(".element__title");
const elementImage = document.querySelector(".element__image");
const elementTemplate = document.querySelector("#element-image").content;
const crdPopup = document.querySelector(".popup_card-popup");
const crdPopupContainer = document.querySelector(".popup__container_card-zoom-container");
const crdPopupButton = document.querySelector(".popup__close_card-close");
const crdPopupImage = document.querySelector(".popup__image_card-image");
const crdPopupTitle = document.querySelector(".popup__textbox_card-textbox");
const elementsContainer = document.querySelector(".elements");
const addPopup = document.querySelector(".popup_add-popup");
const addPopupContainer = document.querySelector(".popup__container_add-container");

function createElement(data, userID, handleChangeLikeStatus, handleDeleteCard) {
    const newElement = elementTemplate.querySelector(".element").cloneNode(true);
    const newElementName = newElement.querySelector(".element__title");
    const newElementImage = newElement.querySelector(".element__image");
    const deleteButton = newElement.querySelector(".element__delete");
    const likeButton = newElement.querySelector(".element__like");

    newElementName.textContent = data.name;
    newElementImage.src = data.link;
    newElementImage.alt = data.name;

    updateLikeStatus(newElement, data.likes, userID);

    if (data.owner._id !== userID) {
        deleteButton.remove();
    }

    likeButton.addEventListener("click", () => {
        handleChangeLikeStatus(data._id, likeButton.classList.contains("element__like_active"), newElement);
    });

    deleteButton.addEventListener("click", () => {
        handleDeleteCard(data._id, newElement);
    });

    newElementImage.addEventListener("click", () => {
        openPopup(crdPopup);
        crdPopupTitle.textContent = data.name;
        crdPopupImage.src = data.link;
        crdPopupImage.alt = data.name;
    });

    return newElement;
}

export const removeCard = (newElement) => {
    newElement.remove();
    newElement = null;
};

export function addElementsContainer(elementsContainer, data, userID) {
    const newElement = createElement(data, userID, handleChangeLikeStatus, handleDeleteCard);
    elementsContainer.prepend(newElement);
}
