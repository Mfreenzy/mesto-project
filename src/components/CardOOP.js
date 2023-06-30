import {openPopup} from "./modal";
import {api} from "./api";

const crdPopup = document.querySelector(".popup_card-popup");
const crdPopupImage = document.querySelector(".popup__image_card-image");
const crdPopupTitle = document.querySelector(".popup__textbox_card-textbox");


export default class CardOOP {
  constructor({card, userID, handleDeleteCard}, selector) {
    this._userID = userID;
    this._cardLink = card.link;
    this._cardName = card.name;
    this._cardID = card._id;
    this._cardLikes = card.likes;
    this._myCard = (card.owner._id === this._userID);
    this._hasMyLike = this._isLiked(this._cardLikes);
    this._selector = selector;
    this._handleDeleteCard = handleDeleteCard;
  }

  _isLiked(likesCard) {
    return Boolean(
      likesCard.find((likeObj) => {
        return likeObj._id === this._userID;
      })
    );
  };

  _updateLikeStatus() {
    this._cardNumberLike.textContent = this._cardLikes.length;
    this._hasMyLike
      ? this._cardLike.classList.add('element__like_active')
      : this._cardLike.classList.remove('element__like_active');
  };

  _handleChangeLikeStatus = () => {
    api.changeLikeStatus(this._cardID, this._hasMyLike)
      .then((dataFromServer) => {
        this._cardLikes = dataFromServer.likes;
        this._hasMyLike = this._isLiked(this._cardLikes);
        this._updateLikeStatus();
      }).catch((err) => {
      console.log(err);
    });
  };

  _getElementOOP() {
    return document
      .querySelector(this._selector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  createElement() {
    this._element = this._getElementOOP();
    this._cardImage = this._element.querySelector('.element__image');
    this._cardNumberLike = this._element.querySelector('.element__like-count');
    this._cardLike = this._element.querySelector('.element__like');
    this._cardTrash = this._element.querySelector('.element__delete');
    this._setEventListeners();
    this._cardImage.src = this._cardLink;
    this._cardImage.alt = `Визуальное отображение места - ${this._cardName}`;
    this._cardNumberLike.textContent = (this._cardLikes.length);
    if (this._hasMyLike) {
      this._cardLike.classList.add('element__like_active');
    }
    if (!this._myCard) {
      this._cardTrash.remove();
    }
    this._element.querySelector('.element__title').textContent = this._cardName;
    return this._element;
  }

  _openZoom() {
    openPopup(crdPopup);
    crdPopupTitle.textContent = this._cardName;
    crdPopupImage.src = this._cardLink;
    crdPopupImage.alt = this._cardName;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () =>
      this._openZoom());

    this._cardLike.addEventListener('click', () =>
      this._handleChangeLikeStatus());

    if (this._myCard) {
      this._cardTrash.addEventListener('click', () =>
        this._handleDeleteCard(this._cardID, this._element));
    }
  }
}