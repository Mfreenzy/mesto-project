import '../src/pages/index.css'
import { enableValidation, clearInputError} from './components/validate';
import { openPopup, closePopup } from './components/modal';
import { addElementsContainer, elementsContainer, addPopup} from './components/card';
import { clearErrorText } from './components/utils';


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
const formEdit = document.querySelector(".popup__name_edit-name");
const submitButton = document.querySelector(".popup__submit_edit-submit");
const addButton = document.querySelector(".profile__add-button");
const addPopupClose = document.querySelector(".popup__close_add-close");
const formAddElement = document.querySelector(".popup__name_add-name");
const submitAddButton = document.querySelector(".popup__submit_add-submit");
const closeButtons = document.querySelectorAll('.popup__close')
const popups = document.querySelectorAll(".popup");
const profileNameInput = document.querySelector(".profile__name");
const profileProf = document.querySelector(".profile__prof");
const nameInput = document.querySelector(".popup__input_text_ed-name");
const jobInput = document.querySelector(".popup__input_text_ed-prof");
const editProfile = document.querySelector(".popup_edit-profile");
const addNameInput = document.querySelector(".popup__input_text_ad-name");
const addLink = document.querySelector(".popup__input_text__ad-link");


initialCards.forEach((card) => {
  addElementsContainer(elementsContainer, card.name, card.link);
});

function addFormSubmit(evt) {
  evt.preventDefault();
  addElementsContainer(elementsContainer, addNameInput.value, addLink.value);
  closePopup(addPopup);
  evt.target.reset();
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileNameInput.textContent = nameInput.value;
  profileProf.textContent = jobInput.value;
  closePopup(editProfile);
}

profileEditButton.addEventListener("click", () => {
  openPopup(editProfile);
  nameInput.value = profileNameInput.textContent;
  jobInput.value = profileProf.textContent;
  clearErrorText()
  clearInputError()
});

formEdit.addEventListener("submit", handleFormSubmit);

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


const settings = {
  formSelector: ".popup__name",
  inputSelector:".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_invalid",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

enableValidation(settings)




