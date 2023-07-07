/*import {userId} from "../index";*/

export class Card {
  constructor({card, userId, handleDeleteCard, handleChangeLikeStatus, popupZoom}, selectorTemplate) {
    this._userId = userId;
    this._cardLink = card.link;
    this._cardName = card.name;
    this._cardID = card._id;
    this._cardLikes = card.likes;
    this._ownerId = card.owner._id;
    this._selector = selectorTemplate;
    this._handleDeleteCard = handleDeleteCard;
    this._handleChangeLikeStatus = handleChangeLikeStatus;
    this._openZoom = popupZoom;
  }

  _getElement() {
    return document
      .querySelector(this._selector)
      .content
      .firstElementChild
      .cloneNode(true);
  }

  createElement(myId) {
    this._myCard = (this._ownerId === myId);
    this._element = this._getElement();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementLikeCount = this._element.querySelector('.element__like-count');
    this._elementLike = this._element.querySelector('.element__like');
    this._elementDelete = this._element.querySelector('.element__delete');
    this._hasMyLike = this._checkMyLike();
    this._setEventListeners();
    this._elementImage.src = this._cardLink;
    this._elementImage.alt = `Визуальное отображение места - ${this._cardName}`;
    this._elementLikeCount.textContent = (this._cardLikes.length);
    if (this._hasMyLike) {
      this._elementLike.classList.add('element__like_active');
    }
    if (!this._myCard) {
      this._elementDelete.remove();
    }
    this._element.querySelector('.element__title').textContent = this._cardName;
    return this._element;
  }

  _checkMyLike() {
    return  Boolean(
      this._cardLikes.find((likeObj) => {
        return likeObj._id === this._userId;
      })
    );
  }

  updateLikeValueInstance = (likesArray) => {
    this._cardLikes = likesArray;
    this._hasMyLike = this._checkMyLike();
    this._elementLikeCount.textContent = (this._cardLikes.length);
    this._hasMyLike
      ? this._elementLike.classList.add('element__like_active')
      : this._elementLike.classList.remove('element__like_active');
  };

  getHasMyLike() {
    return this._hasMyLike;
  }

  getCardId() {
    return this._cardID
  }

  remove() {
    this._element.remove();
    this._element = null;
  }

  _getInfoImg() {
    return {title: this._cardName, link: this._cardLink}
  }

  _setEventListeners() {
    this._elementImage.addEventListener('click', () =>
      this._openZoom.open(this._getInfoImg()));

    this._elementLike.addEventListener('click', () =>
      this._handleChangeLikeStatus(this));

    if (this._myCard) {
      this._elementDelete.addEventListener('click', () =>
        this._handleDeleteCard(this));
    }
  }
}