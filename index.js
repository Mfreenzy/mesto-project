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

const popup = document.querySelector(".popup");
const editProfile = document.querySelector(".popup_edit-profile");
const editContainer = document.querySelector(".popup__container_edit-container");
const profileEditButton = document.querySelector(".profile__edit-button");
const editClose = document.querySelector(".popup__close_edit-close");
const elementsContainer = document.querySelector(".elements");
const formElement = document.querySelector(".popup__name_edit-name");
const nameInput = document.querySelector(".popup__input_text_ed-name");
const jobInput = document.querySelector(".popup__input_text_ed-prof");
const submitButton = document.querySelector(".popup__submit_edit-submit");
const profileName = document.querySelector(".profile__name");
const profileProf = document.querySelector(".profile__prof");
const addPopup = document.querySelector(".popup_add-popup");
const addPopupContainer = document.querySelector(".popup__container_add-container");
const addButton = document.querySelector(".profile__add-button");
const addPopupClose = document.querySelector(".popup__close_add-close");
const formAddElement = document.querySelector(".popup__name_add-name");
const addNameInput = document.querySelector(".popup__input_text_ad-name");
const addLink = document.querySelector(".popup__input_text__ad-link");
const submitAddButton = document.querySelector(".popup__submit_add-submit");
const elementTitle = document.querySelector(".element__title");
const elementImage = document.querySelector(".element__image");
const elementTemplate = document.querySelector("#element-image").content;
const crdPopup = document.querySelector(".popup_card-popup");
const crdPopupContainer = document.querySelector(".popup__container_card-zoom-container");
const crdPopupButton = document.querySelector(".popup__close_card-close");
const crdPopupImage = document.querySelector(".popup__image_card-image");
const crdPopupTitle = document.querySelector(".popup__textbox_card-textbox");
const closeButtons = document.querySelectorAll('.popup__close')


function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProf.textContent = jobInput.value;
  closePopup(editProfile);
  evt.target.reset();
}

function addFormSubmit(evt) {
  evt.preventDefault();
  addElementsContainer(elementsContainer, addNameInput.value, addLink.value);
  closePopup(addPopup);
  evt.target.reset();
}

function createElement(elementTitle, elementImage) {
  const newElement = elementTemplate.querySelector(".element").cloneNode(true);
  const newElementName = newElement.querySelector(".element__title");
  const newElementImage = newElement.querySelector(".element__image");
  const deleteButton = newElement.querySelector(".element__delete");
  const likeButton = newElement.querySelector(".element__like");

  newElementName.textContent = elementTitle;
  newElementImage.src = elementImage;
  newElementImage.alt = elementTitle;

  closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => {closePopup(popup)});
  });

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

  function clearCrdPopup() {
    crdPopupTitle.textContent = delete elementTitle;
    crdPopupImage.src = delete elementImage;
    crdPopupImage.alt = delete elementTitle; 
  }

  crdPopupButton.addEventListener('click', clearCrdPopup)
      
  return newElement;
}

function addElementsContainer(elementsContainer, newElementName, newElementImage) {
  const newElement = createElement(newElementName, newElementImage);
  elementsContainer.prepend(newElement);
}

profileEditButton.addEventListener("click", () => {
  openPopup(editProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileProf.textContent;
});

formElement.addEventListener("submit", handleFormSubmit);

addButton.addEventListener("click", () => {
  openPopup(addPopup);
});

formAddElement.addEventListener("submit", addFormSubmit);

initialCards.forEach((card) => {
  addElementsContainer(elementsContainer, card.name, card.link);
});
