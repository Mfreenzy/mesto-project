import '../src/pages/index.css'
import { enableValidation} from './components/validate';
import { clearErrorText, clearInputError } from './components/utils';
import { openPopup, closePopup, handleFormSubmit, profileProf, profileName, nameInput, jobInput, editProfile} from './components/modal';
import { addElementsContainer, addFormSubmit, elementsContainer, addPopup} from './components/card';


const initialCards = [
  {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];


const editContainer = document.querySelector(".popup__container_edit-container");
const profileEditButton = document.querySelector(".profile__edit-button");
const editClose = document.querySelector(".popup__close_edit-close");
const formElement = document.querySelector(".popup__name_edit-name");
const submitButton = document.querySelector(".popup__submit_edit-submit");
const addButton = document.querySelector(".profile__add-button");
const addPopupClose = document.querySelector(".popup__close_add-close");
const formAddElement = document.querySelector(".popup__name_add-name");
const submitAddButton = document.querySelector(".popup__submit_add-submit");
const closeButtons = document.querySelectorAll('.popup__close')
const popups = document.querySelectorAll(".popup");


initialCards.forEach((card) => {
  addElementsContainer(elementsContainer, card.name, card.link);
});


profileEditButton.addEventListener("click", () => {
  openPopup(editProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileProf.textContent;
  clearErrorText()
  clearInputError()
});

formElement.addEventListener("submit", handleFormSubmit);

addButton.addEventListener("click", () => {
  openPopup(addPopup);
  clearErrorText()
  clearInputError()
});

formAddElement.addEventListener("submit", addFormSubmit);

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(popup)
  });
});

popups.forEach((popup) =>{
  popup.addEventListener('click', function(evt) {
    closePopup(evt.target);
  });
  document.addEventListener("keydown", function(evt) {
    if (evt.key === 'Escape') {
      closePopup(popup)
  }})
});

const validateObject = {
  formSelector: ".popup__name",
  inputSelector:".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_invalid",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
}

enableValidation()



