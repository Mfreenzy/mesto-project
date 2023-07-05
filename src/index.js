import "../src/pages/index.css";

import {PopupWithForm} from "./components/popupWithForm";
import {UserInfo} from "./components/userInfo";
import {FormValidator} from "./components/formValidator";
import {api} from "./components/api"
import {Section} from "./components/Section";
import {Card} from "./components/Card";
import {PopupWithImage} from "./components/popupWithImage";

const profileEditButton = document.querySelector(".profile__edit-button");
const formEdit = document.querySelector(".popup__name_edit-name");
const addButton = document.querySelector(".profile__add-button");
const formAddElement = document.querySelector(".popup__name_add-name");
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

// К.3 - Создание секции карточек
const sectionCards = new Section('.elements',
  (card, myId) => {
    const newCard = new Card(
      {card, handleDeleteCard, handleChangeLikeStatus, popupZoom},
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
  const lastUserInfo = userInfo.getUserInfo();
  nameInput.value = lastUserInfo.username;
  jobInput.value = lastUserInfo.description;
});

// 3. Экземпляр класса PopupWithForm для попапа добавления карточки.

const popupAddCard = new PopupWithForm(".popup_add-popup", {
  //callbackFormSubmit: (formValues) => { // Кочкина Екатерина - ненужный параметр formValues
  callbackFormSubmit: () => {
  popupAddCard.putStatusOnButton();
  api.addCard({
    name: addNameInput.value,
    link: addLink.value,
  }).then((res) =>{
    debugger
    const newCard = new Card(
              {card: res, handleDeleteCard, handleChangeLikeStatus, popupZoom},
              '#element-image');
            const cardElement = newCard.createElement(userId);
            sectionCards.addItem({element: cardElement, isReverse: true});
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

// К.1 - Обработка изменения лайка
export const handleChangeLikeStatus = (instance) => {
  api.changeLikeStatus(instance.getCardId(), instance.getHasMyLike())
    .then((dataFromServer) => {
      instance.updateLikeValueInstance(dataFromServer.likes);
    }).catch((err) => {
    console.log(err);
  });
};

// К.2 - Обработка удаления карточки
export const handleDeleteCard = (instance) => {
  api.deleteCard(instance.getCardId()).then(() => {
    instance.remove();
  })
    .catch((err) => {
      console.log(err);
    });
};

// К.3 - Создание попапа просмотра картинки
const popupZoom = new PopupWithImage(".popup_card-popup");
popupZoom.setEventListeners();