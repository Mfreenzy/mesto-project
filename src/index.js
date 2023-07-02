import "../src/pages/index.css";
//import { enableValidation } from "./components/validate";
//import { openPopup, closePopup } from "./components/modal";
import { addElementsContainer, elementsContainer, addPopup, updateLikeStatus, removeCard } from "./components/card";
import { disableButton } from "./components/utils";
// import { editUserProfile, addCard, editAvatar, getInfo, changeLikeStatus, deleteCard } from "./components/api";
import { setStatusOnButton } from "./components/utils";
import { api }   from "./components/api"
import { PopupWithForm } from "./components/popupWithForm";
import { UserInfo } from "./components/userInfo";
import { FormValidator } from "./components/formValidator";


const editContainer = document.querySelector(".popup__container_edit-container");
const profileEditButton = document.querySelector(".profile__edit-button");
const editClose = document.querySelector(".popup__close_edit-close");
const formEdit = document.querySelector(".popup__name_edit-name");
const submitButton = document.querySelector(".popup__submit_edit-submit");
const addButton = document.querySelector(".profile__add-button");
const addPopupClose = document.querySelector(".popup__close_add-close");
const formAddElement = document.querySelector(".popup__name_add-name");
const submitAddButton = document.querySelector(".popup__submit_add-submit");
const closeButtons = document.querySelectorAll(".popup__close");
const popups = document.querySelectorAll(".popup");
const profileNameInput = document.querySelector(".profile__name");
const profileProf = document.querySelector(".profile__prof");
const nameInput = document.querySelector(".popup__input_text_ed-name");
const jobInput = document.querySelector(".popup__input_text_ed-prof");
const editProfile = document.querySelector(".popup_edit-profile");
const addNameInput = document.querySelector(".popup__input_text_ad-name");
const addLink = document.querySelector(".popup__input_text__ad-link");
const avatarContainer = document.querySelector(".popup__container_avatar");
const profileAvatarButton = document.querySelector(".profile__avatar-button");
const avatarClose = document.querySelector(".popup__close_avatar");
const formAvatar = document.querySelector(".popup__name_avatar");
const avatarSubmitButton = document.querySelector(".popup__submit_avatar-submit");
const avatarLink = document.querySelector(".popup__input_text__avatar-link");
const profileAvatar = document.querySelector(".profile__avatar");
const avProfile = document.querySelector(".popup_avatar");


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


let userID = null;

api.getInfo()
.then(([user, initialCards]) => {
    profileNameInput.textContent = user.name;
    profileProf.textContent = user.about;
    profileAvatar.src = user.avatar;
    userID = user._id;

    initialCards.forEach((data) => {
        addElementsContainer(elementsContainer, data, userID);
    })
})
.catch((err) => {
    console.log(err)
})



const popupAvatar = new PopupWithForm(
    '.popup_avatar', {
      callbackFormSubmit:
        (user) => {
          popupAvatar.putSavingProcessText();
          api.editAvatar(user)
            .then((res) => {
              userInfo.setUserAvatar(res.avatar);
              popupAvatar.close();
            })
            .catch((err) => {
                console.log(`При обновлении аватара возникла ошибка, ${err}`)
            })
            .finally(() => {
              popupAvatar.returnSavingProcessText();
            })
        }
    });

  popupAvatar.setEventListeners();

  const profileAvatarEditValidate = new FormValidator(settings, formAvatar);
  profileAvatarEditValidate.enableValidation();
//   Это экземпляр класса FormValidator 


profileAvatarButton.addEventListener("click", () => {
    popupAvatar.open();
    profileAvatarEditValidate.resetValidate();
});


function addFormSubmit(evt) {
    evt.preventDefault();
    console.log(addNameInput.value);
    console.log(addLink.value);
    setStatusOnButton({ buttonElement: submitAddButton, text: 'Сохраняем...', disabled: true });
    api.addCard({
        name: addNameInput.value,
        link: addLink.value,
    })
        .then((dataFromServer) => {
            addElementsContainer(elementsContainer, dataFromServer, userID);
            closePopup(addPopup);
            evt.target.reset();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setStatusOnButton({ buttonElement: submitAddButton, text: 'Сохранить', disabled: false })
          })
}

const popupEdit = new PopupWithForm(
    '.popup_edit-profile', {
      callbackFormSubmit:
        (user) => {
          popupEdit.putSavingProcessText();
          api.editUserProfile(user)
            .then((res) => {
              userInfo.setUserInfo({username:res.name, description:res.about});
              popupEdit.close();
            })
            .catch((err) => {
                console.log(`При обновлении профиля возникла ошибка, ${err}`)
            })
            .finally(() => {
              popupEdit.returnSavingProcessText();
            })
        }
    });

  popupEdit.setEventListeners();

  const profileEditValidate = new FormValidator(settings, formEdit);
  profileEditValidate.enableValidation();
//   Это экземпляр класса FormValidator 


profileEditButton.addEventListener("click", () => {
        popupEdit.open()
        profileEditValidate.resetValidate();
        const lastUserInfo = userInfo.getUserInfo();
        nameInput.value = lastUserInfo.username
        jobInput.value = lastUserInfo.description
})




// function handleFormSubmit(evt) {
//     evt.preventDefault();
//     setStatusOnButton({ buttonElement: submitButton, text: 'Сохраняем...', disabled: true })
//     api.editUserProfile({
//         name: nameInput.value,
//         about: jobInput.value,
//     }).then((data) => {
//         profileNameInput.textContent = data.name;
//         profileProf.textContent = data.about;
//         closePopup(editProfile);
//     })
//     .catch((err) => {
//         console.log(err);
//     })
//     .finally(() => {
//         setStatusOnButton({ buttonElement: submitButton, text: 'Сохранить', disabled: false })
//       })
// }

// profileEditButton.addEventListener("click", () => {
//     openPopup(editProfile);
//     nameInput.value = profileNameInput.textContent;
//     jobInput.value = profileProf.textContent;
// });

// formEdit.addEventListener("submit", handleFormSubmit);

addButton.addEventListener("click", (evt) => {
    openPopup(addPopup);
    disableButton(submitAddButton);
});

formAddElement.addEventListener("submit", addFormSubmit);

// profileAvatarButton.addEventListener("click", () => {
//     openPopup(avProfile);
//     disableButton(avatarSubmitButton);
// });

// formAvatar.addEventListener("submit", avatarSubmit);

// closeButtons.forEach((button) => {
//     const popup = button.closest(".popup");
//     button.addEventListener("click", () => {
//         closePopup(popup);
//     });
// });

export const handleChangeLikeStatus = (cardID, isLiked, newElement) => {
    api.changeLikeStatus(cardID, isLiked)
    .then((dataFromServer) => {
        updateLikeStatus(newElement, dataFromServer.likes, userID);
    }).catch((err) => {
        console.log(err);
    });
};

export const handleDeleteCard = (cardID, newElement) => {
    api.deleteCard(cardID).then(() => {
        removeCard(newElement);
    })
    .catch((err) => {
        console.log(err);
    });
};


