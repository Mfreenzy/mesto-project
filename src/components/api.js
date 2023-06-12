const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-25",
  headers: {
      authorization: "b9602b46-c70a-470b-a1e9-9ea7e0422b9a",
      "Content-Type": "application/json",
  },
};

export const getUserProfile = () => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-25/users/me`, {
      headers: {
          authorization: "b9602b46-c70a-470b-a1e9-9ea7e0422b9a",
          "Content-Type": "application/json",
      },
  }).then((res) => {
      if (res.ok) {
          return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const getInitialCards = () => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-25/cards`, {
      headers: {
          authorization: "b9602b46-c70a-470b-a1e9-9ea7e0422b9a",
          "Content-Type": "application/json",
      },
  }).then((res) => {
      if (res.ok) {
          return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export function getInfo() {
  return Promise.all([getUserProfile(), getInitialCards()]);
}

export const editUserProfile = (editData) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-25/users/me`, {
      method: "PATCH",
      headers: {
          authorization: "b9602b46-c70a-470b-a1e9-9ea7e0422b9a",
          "Content-Type": "application/json",
      },
      body: JSON.stringify(editData),
  }).then((res) => {
      if (res.ok) {
          return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const addCard = (addData) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-25/cards`, {
      method: "POST",
      headers: {
          authorization: "b9602b46-c70a-470b-a1e9-9ea7e0422b9a",
          "Content-Type": "application/json",
      },
      body: JSON.stringify(addData),
  }).then((res) => {
      if (res.ok) {
          return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const deleteCard = (dataID) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-25/cards/${dataID}`, {
      method: "DELETE",
      headers: {
          authorization: "b9602b46-c70a-470b-a1e9-9ea7e0422b9a",
          "Content-Type": "application/json",
      },
  }).then((res) => {
      if (res.ok) {
          return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// export const putLikeOnCard = (_id) => {
//     return fetch(`https://nomoreparties.co/v1/plus-cohort-25/cards/likes/_id`, {
//         method: 'PUT',
//         headers: {
//           authorization: 'b9602b46-c70a-470b-a1e9-9ea7e0422b9a',
//           'Content-Type': 'application/json'
//         }
//     })
//        .then(res => {
//         if (res.ok) {
//           return res.json();
//         }
//         // если ошибка, отклоняем промис
//         return Promise.reject(`Ошибка: ${res.status}`);
//       });
// }

// export const removeLikeFromCard = (_id) => {
//     return fetch (`https://nomoreparties.co/v1/plus-cohort-25/cards/likes/_id`, {
//         method: 'DELETE',
//         headers: {
//           authorization: 'b9602b46-c70a-470b-a1e9-9ea7e0422b9a',
//           'Content-Type': 'application/json'
//         }
//     })
//        .then(res => {
//         if (res.ok) {
//           return res.json();
//         }
//         // если ошибка, отклоняем промис
//         return Promise.reject(`Ошибка: ${res.status}`);
//       });
// }

export const changeLikeStatus = (dataID, isLike) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-25/cards/likes/${dataID}`, {
      method: isLike ? "DELETE" : "PUT",
      headers: {
          authorization: "b9602b46-c70a-470b-a1e9-9ea7e0422b9a",
          "Content-Type": "application/json",
      },
  }).then((res) => {
      if (res.ok) {
          return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const editAvatar = (editData) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-25/users/me/avatar`, {
      method: "PATCH",
      headers: {
          authorization: "b9602b46-c70a-470b-a1e9-9ea7e0422b9a",
          "Content-Type": "application/json",
      },
      body: JSON.stringify(editData),
  }).then((res) => {
      if (res.ok) {
          return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
  });
};
