const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-25",
  headers: {
      authorization: "b9602b46-c70a-470b-a1e9-9ea7e0422b9a",
      "Content-Type": "application/json",
  },
};

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
}


export const getUserProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
  }).then((res) => checkResponse(res))
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  }).then((res) => checkResponse(res))};

export function getInfo() {
  return Promise.all([getUserProfile(), getInitialCards()]);
}


export const editUserProfile = (editData) => {
  return fetch(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify(editData),
  }).then((res) => checkResponse(res))};


export const addCard = (addData) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
      body: JSON.stringify(addData),
  }).then((res) => checkResponse(res))};

export const deleteCard = (dataID) => {
  return fetch(`${config.baseUrl}/cards/${dataID}`, {
      method: "DELETE",
      headers: config.headers,
  }).then((res) => checkResponse(res))};

export const changeLikeStatus = (dataID, isLike) => {
  return fetch(`${config.baseUrl}/cards/likes/${dataID}`, {
      method: isLike ? "DELETE" : "PUT",
      headers: config.headers,
  }).then((res) => checkResponse(res))};

export const editAvatar = (editData) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify(editData),
  }).then((res) => checkResponse(res))};
