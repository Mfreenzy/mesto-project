import "../src/pages/index.css";
import {PopupWithForm} from "./components/PopupWithForm";
import {UserInfo} from "./components/UserInfo";
import {FormValidator} from "./components/FormValidator";
import {Api} from "./components/Api"
import {Section} from "./components/Section";
import {Card} from "./components/Card";
import {PopupWithImage} from "./components/PopupWithImage";
import {
  profileEditButton,
  formEdit,
  addButton,
  addLink,
  addNameInput,
  formAddElement,
  formAvatar,
  jobInput,
  nameInput,
  profileAvatarButton,
  settings,
  } from "./components/utils/constants"

let userId = null;

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-25",
  headers: {
    authorization: "b9602b46-c70a-470b-a1e9-9ea7e0422b9a",
    "Content-Type": "application/json",
  },
});

function createNewCard(card, myId, isReverse = false) {
  const newCard = new Card(
    {card, userId:myId, handleDeleteCard, handleChangeLikeStatus, popupZoom},
    '#element-image');
  const cardElement = newCard.createElement(myId);
  sectionCards.addItem({element: cardElement, isReverse});
};

// К.3 - Создание секции карточек
const sectionCards = new Section('.elements',
  (card, myId) => {
    createNewCard(card, myId);
  });

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userDescriptionSelector: '.profile__prof',
  userAvatarSelector: '.profile__avatar'
});

// К.3 - Создание попапа просмотра картинки
const popupZoom = new PopupWithImage(".popup_card-popup");
popupZoom.setEventListeners();

api.getInfo()

  .then(([user, initialCards]) => {
    userInfo.setFullInfo(user);
    userId = userInfo.getUserId();
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
        userInfo.setUserInfo({ userName:res.name, description:res.about });
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
  nameInput.value = lastUserInfo.userName;
  jobInput.value = lastUserInfo.description;
  profileEditValidate.checkErrorForm();

});

// 3. Экземпляр класса PopupWithForm для попапа добавления карточки.

const popupAddCard = new PopupWithForm(".popup_add-popup", {
  callbackFormSubmit: () => {
    popupAddCard.putStatusOnButton();
    api.addCard({
      name: addNameInput.value,
      link: addLink.value,
    }).then((card) => {
      createNewCard(card, userId, true);
      popupAddCard.close();
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
const handleChangeLikeStatus = (instance) => {
  api.changeLikeStatus(instance.getCardId(), instance.getHasMyLike())
    .then((dataFromServer) => {
      instance.updateLikeValueInstance(dataFromServer.likes);
    }).catch((err) => {
    console.log(err);
  });
};

// К.2 - Обработка удаления карточки
const handleDeleteCard = (instance) => {
  api.deleteCard(instance.getCardId()).then(() => {
    instance.remove();
  })
    .catch((err) => {
      console.log(err);
    });
};



