class Api {
  constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
  }

  // 1. Проверка ответа.

  _checkResponse(res) {
      if (res.ok) {
          return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
  }

  // 2. Получение профиля пользователя.

  getUserProfile() {
      return fetch(`${this._baseUrl}/users/me`, {
          headers: this._headers,
      }).then((res) => this._checkResponse(res));
  }

  // 3. Получение начальных карточек.

  getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
          headers: this._headers,
      }).then((res) => this._checkResponse(res));
  }

  // 4. Получение полной информации о пользователе/начальных картинках.

  getInfo() {
      return Promise.all([this.getUserProfile(), this.getInitialCards()]);
  }

  // 5. Редактирование профиля пользователя.

  editUserProfile({username, description}) {
      return fetch(`${this._baseUrl}/users/me`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
            name: username,
            about: description
          }),
      }).then((res) => this._checkResponse(res));
  }

  // 6. Добавление карточек.

  addCard(addData) {
      return fetch(`${this._baseUrl}/cards`, {
          headers: this._headers,
          method: "POST",
          body: JSON.stringify(addData),
      }).then((res) => this._checkResponse(res));
  }

  // 7. Удаление карточек.

  deleteCard(dataID) {
      return fetch(`${this._baseUrl}/cards/${dataID}`, {
          method: "DELETE",
          headers: this._headers,
      }).then((res) => this._checkResponse(res));
  }

  // 8. Изменение статуса кнопки "Like".

  changeLikeStatus(dataID, isLike) {
      return fetch(`${this._baseUrl}/cards/likes/${dataID}`, {
          method: isLike ? "DELETE" : "PUT",
          headers: this._headers,
      }).then((res) => this._checkResponse(res));
  }

  // 9. Редактирование аватара профиля пользователя.

  editAvatar(editData) {
    debugger;
      return fetch(`${this._baseUrl}/users/me/avatar`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify(editData),
      }).then((res) => this._checkResponse(res));
  }
}

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-25",
  headers: {
      authorization: "b9602b46-c70a-470b-a1e9-9ea7e0422b9a",
      "Content-Type": "application/json",
  },
});

export {api}