class Api {
  constructor({ baseUrl, headers }) {
      this._link = baseUrl;
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
      return fetch(`${this._link}/users/me`, {
          headers: this._headers,
      }).then((res) => this._checkResponse(res));
  }

  // 3. Получение начальных карточек.

  getInitialCards() {
      return fetch(`${this._link}/cards`, {
          headers: this._headers,
      }).then((res) => this._checkResponse(res));
  }

  // 4. Получение полной информации о пользователе/начальных картинках.

  getInfo() {
      return Promise.all([this.getUserProfile(), this.getInitialCards()]);
  }

  // 5. Редактирование профиля пользователя.

  editUserProfile(editData) {
      return fetch(`${this._link}/users/me`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify(editData),
      }).then((res) => this._checkResponse(res));
  }

  // 6. Добавление карточек.

  addCard(addData) {
      return fetch(`${this._link}/cards`, {
          headers: this._headers,
          method: "POST",
          body: JSON.stringify(addData),
      }).then((res) => this._checkResponse(res));
  }

  // 7. Удаление карточек.

  deleteCard(dataID) {
      return fetch(`${this._link}/cards/${dataID}`, {
          method: "DELETE",
          headers: this._headers,
      }).then((res) => this._checkResponse(res));
  }

  // 8. Изменение статуса кнопки "Like".

  changeLikeStatus(dataID, isLike) {
      return fetch(`${this._link}/cards/likes/${dataID}`, {
          method: isLike ? "DELETE" : "PUT",
          headers: this._headers,
      }).then((res) => this._checkResponse(res));
  }

  // 9. Редактирование аватара профиля пользователя.

  editAvatar(editData) {
      return fetch(`${this._link}/users/me/avatar`, {
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


// const config = {
//   baseUrl: "https://nomoreparties.co/v1/plus-cohort-25",
//   headers: {
//       authorization: "b9602b46-c70a-470b-a1e9-9ea7e0422b9a",
//       "Content-Type": "application/json",
//   },
// };

// function checkResponse(res) {
//     if (res.ok) {
//         return res.json();
//     }
//     // если ошибка, отклоняем промис
//     return Promise.reject(`Ошибка: ${res.status}`);
// }


// export const getUserProfile = () => {
//   return fetch(`${config.baseUrl}/users/me`, {
//       headers: config.headers
//   }).then((res) => checkResponse(res))
// }

// export const getInitialCards = () => {
//   return fetch(`${config.baseUrl}/cards`, {
//     headers: config.headers
//   }).then((res) => checkResponse(res))};

// export function getInfo() {
//   return Promise.all([getUserProfile(), getInitialCards()]);
// }


// export const editUserProfile = (editData) => {
//   return fetch(`${config.baseUrl}/users/me`, {
//       method: "PATCH",
//       headers: config.headers,
//       body: JSON.stringify(editData),
//   }).then((res) => checkResponse(res))};


// export const addCard = (addData) => {
//   return fetch(`${config.baseUrl}/cards`, {
//     headers: config.headers,
//     method: "POST",
//       body: JSON.stringify(addData),
//   }).then((res) => checkResponse(res))};

// export const deleteCard = (dataID) => {
//   return fetch(`${config.baseUrl}/cards/${dataID}`, {
//       method: "DELETE",
//       headers: config.headers,
//   }).then((res) => checkResponse(res))};

// export const changeLikeStatus = (dataID, isLike) => {
//   return fetch(`${config.baseUrl}/cards/likes/${dataID}`, {
//       method: isLike ? "DELETE" : "PUT",
//       headers: config.headers,
//   }).then((res) => checkResponse(res))};

// export const editAvatar = (editData) => {
//   return fetch(`${config.baseUrl}/users/me/avatar`, {
//       method: "PATCH",
//       headers: config.headers,
//       body: JSON.stringify(editData),
//   }).then((res) => checkResponse(res))};