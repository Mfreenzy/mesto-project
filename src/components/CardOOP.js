import {userID} from "../index";


export class CardOOP {
  constructor({card, handleDeleteCard, handleChangeLikeStatus, openZoom}, selector) {
    this._userID = userID;
    this._cardLink = card.link;
    this._cardName = card.name;
    this._cardID = card._id;
    this._cardLikes = card.likes;
    this._ownerId = card.owner._id;
    this._selector = selector;
    this._handleDeleteCard = handleDeleteCard;
    this._handleChangeLikeStatus = handleChangeLikeStatus;
    this._openZoom = openZoom;
  }

  _isLiked(likesCard) {
    this._hasMyLike = Boolean(
      likesCard.find((likeObj) => {
        return likeObj._id === this._userID;
      })
    );
  };

  _getElementOOP() {
    return document
      .querySelector(this._selector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  createElement(myId) {
    this._myCard = (this._ownerId === myId);
    this._element = this._getElementOOP();
    this._cardImage = this._element.querySelector('.element__image');
    this._cardNumberLike = this._element.querySelector('.element__like-count');
    this._cardLike = this._element.querySelector('.element__like');
    this._cardTrash = this._element.querySelector('.element__delete');
    this._isLiked(this._cardLikes);
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

  _setEventListeners() {
    this._cardImage.addEventListener('click', () =>
      this._openZoom({title: this._cardName, url: this._cardLink}));

    this._cardLike.addEventListener('click', () =>
      this._handleChangeLikeStatus(this._cardID, this._hasMyLike, this._element, this));

    if (this._myCard) {
      this._cardTrash.addEventListener('click', () =>
        this._handleDeleteCard(this._cardID, this._element));
    }
  }
}