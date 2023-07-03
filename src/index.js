import "../src/pages/index.css";
import {enableValidation} from "./components/validate";
import {openPopup, closePopup} from "./components/modal";
import {disableButton} from "./components/utils";
import {setStatusOnButton} from "./components/utils";
import {api} from "./components/api"
import {Section} from "./components/Section";
import {Card} from "./components/Card";
/*
const elementsContainer = document.querySelector(".elements");
const editContainer = document.querySelector(".popup__container_edit-container");
const editClose = document.querySelector(".popup__close_edit-close");
const addPopupClose = document.querySelector(".popup__close_add-close");
const popups = document.querySelectorAll(".popup");
const avatarContainer = document.querySelector(".popup__container_avatar");
const avatarClose = document.querySelector(".popup__close_avatar");
*/


const addPopup = document.querySelector(".popup_add-popup");
const crdPopup = document.querySelector(".popup_card-popup");
const crdPopupImage = document.querySelector(".popup__image_card-image");
const crdPopupTitle = document.querySelector(".popup__textbox_card-textbox");
const profileEditButton = document.querySelector(".profile__edit-button");
const formEdit = document.querySelector(".popup__name_edit-name");
const submitButton = document.querySelector(".popup__submit_edit-submit");
const addButton = document.querySelector(".profile__add-button");
const formAddElement = document.querySelector(".popup__name_add-name");
const submitAddButton = document.querySelector(".popup__submit_add-submit");
const closeButtons = document.querySelectorAll(".popup__close");
const profileNameInput = document.querySelector(".profile__name");
const profileProf = document.querySelector(".profile__prof");
const nameInput = document.querySelector(".popup__input_text_ed-name");
const jobInput = document.querySelector(".popup__input_text_ed-prof");
const editProfile = document.querySelector(".popup_edit-profile");
const addNameInput = document.querySelector(".popup__input_text_ad-name");
const addLink = document.querySelector(".popup__input_text__ad-link");
const profileAvatarButton = document.querySelector(".profile__avatar-button");
const formAvatar = document.querySelector(".popup__name_avatar");
const avatarSubmitButton = document.querySelector(".popup__submit_avatar-submit");
const avatarLink = document.querySelector(".popup__input_text__avatar-link");
const profileAvatar = document.querySelector(".profile__avatar");
const avProfile = document.querySelector(".popup_avatar");

export let userId = null;

const sectionCards = new Section('.elements',
  (card, myId) => {
    const newCard = new Card(
      {card, handleDeleteCard, handleChangeLikeStatus, openZoom},
      '#element-image');
    const cardElement = newCard.createElement(myId);
    sectionCards.addItem({element: cardElement});
  });

api.getInfo()

  .then(([user, initialCards]) => {
    profileNameInput.textContent = user.name;
    profileProf.textContent = user.about;
    profileAvatar.src = user.avatar;
    userId = user._id;
    console.log(user);
    console.log(initialCards);
    sectionCards.renderItems(initialCards, userId);
  })
  .catch((err) => {
    console.log(err)
  })


function avatarSubmit(evt) {
  evt.preventDefault();
  console.log(avatarLink.value);
  setStatusOnButton({buttonElement: avatarSubmitButton, text: 'Сохраняем...', disabled: true});
  api.editAvatar({
    avatar: avatarLink.value,
  }).then((data) => {
    profileAvatar.src = data.avatar;
    // subButton.textContent = "Сохранение..."
    closePopup(avProfile);
    evt.target.reset();
  })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setStatusOnButton({buttonElement: avatarSubmitButton, text: 'Сохранить', disabled: false})
    })
}

function addFormSubmit(evt) {
  evt.preventDefault();
  console.log(addNameInput.value);
  console.log(addLink.value);
  setStatusOnButton({buttonElement: submitAddButton, text: 'Сохраняем...', disabled: true});
  api.addCard({
    name: addNameInput.value,
    link: addLink.value,
  })
    .then((dataFromServer) => {
      const newCard = new Card(
        {card: dataFromServer, handleDeleteCard, handleChangeLikeStatus, openZoom},
        '#element-image');
      const cardElement = newCard.createElement(userId);
      sectionCards.addItem({element: cardElement, isReverse: true});
      closePopup(addPopup);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setStatusOnButton({buttonElement: submitAddButton, text: 'Сохранить', disabled: false})
    })
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  setStatusOnButton({buttonElement: submitButton, text: 'Сохраняем...', disabled: true})
  api.editUserProfile({
    name: nameInput.value,
    about: jobInput.value,
  }).then((data) => {
    profileNameInput.textContent = data.name;
    profileProf.textContent = data.about;
    closePopup(editProfile);
  })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setStatusOnButton({buttonElement: submitButton, text: 'Сохранить', disabled: false})
    })
}

profileEditButton.addEventListener("click", () => {
  openPopup(editProfile);
  nameInput.value = profileNameInput.textContent;
  jobInput.value = profileProf.textContent;
});

formEdit.addEventListener("submit", handleFormSubmit);

addButton.addEventListener("click", (evt) => {
  openPopup(addPopup);
  disableButton(submitAddButton);
});

formAddElement.addEventListener("submit", addFormSubmit);

profileAvatarButton.addEventListener("click", () => {
  openPopup(avProfile);
  disableButton(avatarSubmitButton);
});

formAvatar.addEventListener("submit", avatarSubmit);

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    closePopup(popup);
  });
});

export const handleChangeLikeStatus = (/*cardID, isLiked, newElement, */instance) => {
  api.changeLikeStatus(instance.getCardId(), instance.getHasMyLike())
    .then((dataFromServer) => {
      instance.updateLikeValueInstance(dataFromServer.likes);
    }).catch((err) => {
    console.log(err);
  });
};

export const handleDeleteCard = (instance) => {
    api.deleteCard(instance.getCardId()).then(() => {
    instance.remove();
  })
    .catch((err) => {
      console.log(err);
    });
};
const settings = {
  formSelector: ".popup__name",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_invalid",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const openZoom = (instance) => {
  openPopup(crdPopup);
  const title = instance.getInfoImg().title
  crdPopupTitle.textContent = title;
  crdPopupImage.src = instance.getInfoImg().url;
  crdPopupImage.alt = title;
}

enableValidation(settings);