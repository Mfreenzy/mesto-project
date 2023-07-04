import "../src/pages/index.css";
//<<<<<<< pair-programming/cards-cat
import {enableValidation} from "./components/validate";
import {openPopup, closePopup} from "./components/modal";
import {disableButton, setStatusOnButton} from "./components/utils";
import {PopupWithForm} from "./components/popupWithForm";
import {UserInfo} from "./components/userInfo";
import {FormValidator} from "./components/formValidator";
import {api} from "./components/api"
import {Section} from "./components/Section";
import {Card} from "./components/Card";

/* //Кочкина Екатерина - не нужные константы
const elementsContainer = document.querySelector(".elements");
const editContainer = document.querySelector(".popup__container_edit-container");
const editClose = document.querySelector(".popup__close_edit-close");
const addPopupClose = document.querySelector(".popup__close_add-close");
const popups = document.querySelectorAll(".popup");
const avatarContainer = document.querySelector(".popup__container_avatar");
const avatarClose = document.querySelector(".popup__close_avatar");
const avatarLink = document.querySelector(".popup__input_text__avatar-link");
*/
/*//Кочкина Екатерина - не нужные константы - версия 2
const submitButton = document.querySelector(".popup__submit_edit-submit");
const closeButtons = document.querySelectorAll(".popup__close");
const editProfile = document.querySelector(".popup_edit-profile");
const avatarSubmitButton = document.querySelector(".popup__submit_avatar-submit");
const avProfile = document.querySelector(".popup_avatar");
*/

const addPopup = document.querySelector(".popup_add-popup");
const crdPopup = document.querySelector(".popup_card-popup");
const crdPopupImage = document.querySelector(".popup__image_card-image");
const crdPopupTitle = document.querySelector(".popup__textbox_card-textbox");
const profileEditButton = document.querySelector(".profile__edit-button");
const formEdit = document.querySelector(".popup__name_edit-name");
const addButton = document.querySelector(".profile__add-button");
const formAddElement = document.querySelector(".popup__name_add-name");
const submitAddButton = document.querySelector(".popup__submit_add-submit");
const profileNameInput = document.querySelector(".profile__name");
const profileProf = document.querySelector(".profile__prof");
const nameInput = document.querySelector(".popup__input_text_ed-name");
const jobInput = document.querySelector(".popup__input_text_ed-prof");
const addNameInput = document.querySelector(".popup__input_text_ad-name");
const addLink = document.querySelector(".popup__input_text__ad-link");
const profileAvatarButton = document.querySelector(".profile__avatar-button");
const formAvatar = document.querySelector(".popup__name_avatar");
const profileAvatar = document.querySelector(".profile__avatar");


export let userId = null;

const sectionCards = new Section('.elements',
  (card, myId) => {
    const newCard = new Card(
      {card, handleDeleteCard, handleChangeLikeStatus, openZoom},
      '#element-image');
    const cardElement = newCard.createElement(myId);
    sectionCards.addItem({element: cardElement});
  });

const settings = {
  formSelector: ".popup__name",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_invalid",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const userInfo = new UserInfo({
  usernameSelector: '.profile__name',
  userDescriptionSelector: '.profile__prof',
  userAvatarSelector: '.profile__avatar'
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

// 1. Экземпляр класса PopupWithForm для попапа аватара пользователя.

const popupAvatar = new PopupWithForm(".popup_avatar", {
  callbackFormSubmit: (user) => {
    popupAvatar.putStatusOnButton();
    api.editAvatar(user)
      .then((res) => {
        userInfo.setUserAvatar(res.avatar);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(`При обновлении аватара возникла ошибка, ${err}`);
      })
      .finally(() => {
        popupAvatar.returnStatusOnButton();
      });
  },
});

// 1.1. Вызов setEventListeners для попапа аватара пользователя.

popupAvatar.setEventListeners();

// 1.2. Валидация попапа аватара пользователя.

const profileAvatarEditValidate = new FormValidator(settings, formAvatar);
profileAvatarEditValidate.enableValidation();

// 1.3. Слушатель кнопки редактирования попапа аватара пользователя.

profileAvatarButton.addEventListener("click", () => {
  popupAvatar.open();
  profileAvatarEditValidate.resetValidate();
});

// 2. Экземпляр класса PopupWithForm для попапа редактирования данных пользователя.

const popupEdit = new PopupWithForm(".popup_edit-profile", {
  callbackFormSubmit: (user) => {
    popupEdit.putStatusOnButton();
    api.editUserProfile(user)
      .then((res) => {
        userInfo.setUserInfo({username: res.name, description: res.about});
        popupEdit.close();
      })
      .catch((err) => {
        console.log(`При обновлении профиля возникла ошибка, ${err}`);
      })
      .finally(() => {
        popupEdit.returnStatusOnButton();
      });
  },
});

// 2.1. Вызов setEventListeners для попапа редактирования данных пользователя.

popupEdit.setEventListeners();

// 2.2. Валидация попапа редактирования данных пользователя.

const profileEditValidate = new FormValidator(settings, formEdit);
profileEditValidate.enableValidation();

// 2.3. Слушатель кнопки редактирования попапа аватара пользователя.

profileEditButton.addEventListener("click", () => {
  popupEdit.open();
  profileEditValidate.resetValidate();
  const lastUserInfo = userInfo.getUserInfo();
  nameInput.value = lastUserInfo.username;
  jobInput.value = lastUserInfo.description;
});

// 3. Экземпляр класса PopupWithForm для попапа добавления карточки.

const popupAddCard = new PopupWithForm(".popup_add-popup", {
callbackFormSubmit: (formValues) => {
  popupAddCard.putStatusOnButton();
  api.addCard({
    placename: formValues.name,
    placelink: formValues.link
  }).then((res) =>{
    sectionCards.addItem({placename: res.name, placelink: res.link})
    popupAddCard.close()
  }).catch((err) => {
    console.log(`При добавлении изображения возникла ошибка, ${err}`);
  })
  .finally(() => {
    popupAddCard.returnStatusOnButton();
  });
},
});

// 3.1. Вызов setEventListeners для попапа редактирования данных пользователя.

popupAddCard.setEventListeners();

// 3.2. Валидация попапа редактирования данных пользователя.

const profileAddCardValidate = new FormValidator(settings, formAddElement);
profileAddCardValidate.enableValidation();

// 3.3. Слушатель кнопки редактирования попапа аватара пользователя.

addButton.addEventListener("click", () => {
    popupAddCard.open();
    profileAddCardValidate.resetValidate();
});

// function addFormSubmit(evt) {
//   evt.preventDefault();
//   console.log(addNameInput.value);
//   console.log(addLink.value);
//   setStatusOnButton({buttonElement: submitAddButton, text: 'Сохраняем...', disabled: true});
//   api.addCard({
//     name: addNameInput.value,
//     link: addLink.value,
//   })
//     .then((dataFromServer) => {
//       const newCard = new Card(
//         {card: dataFromServer, handleDeleteCard, handleChangeLikeStatus, openZoom},
//         '#element-image');
//       const cardElement = newCard.createElement(userId);
//       sectionCards.addItem({element: cardElement, isReverse: true});
//       closePopup(addPopup);
//       evt.target.reset();
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       setStatusOnButton({buttonElement: submitAddButton, text: 'Сохранить', disabled: false})
//     })
// }

// addButton.addEventListener("click", () => {
//   openPopup(addPopup);
//   disableButton(submitAddButton);
// });

// formAddElement.addEventListener("submit", addFormSubmit);

//<<<<<<< pair-programming/cards-cat // Кочкина Екатерина - удалил, вроде больше не надо
/*profileAvatarButton.addEventListener("click", () => {
  openPopup(avProfile);
  disableButton(avatarSubmitButton);
});*/

//formAvatar.addEventListener("submit", avatarSubmit); // Кочкина Екатерина - после слияния этот код лишний

/*closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    closePopup(popup);
  });
});*/
//=======

export const handleChangeLikeStatus = (instance) => {
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

//<<<<<<< pair-programming/cards-cat
const openZoom = (instance) => {
  openPopup(crdPopup);
  const title = instance.getInfoImg().title
  crdPopupTitle.textContent = title;
  crdPopupImage.src = instance.getInfoImg().url;
  crdPopupImage.alt = title;
}

// enableValidation(settings);
// //=======