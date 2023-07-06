export class UserInfo  {
    // Принимает объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе
    constructor({ usernameSelector, userDescriptionSelector, userAvatarSelector }) {
      this._userName = document.querySelector(usernameSelector);
      this._userDescription = document.querySelector(userDescriptionSelector);
      this._avatarLink = document.querySelector(userAvatarSelector);
    }
    // Метод возвращает объект с данными пользователя
    getUserInfo() {
      return {
        userName: this._userName.textContent,
        description: this._userDescription.textContent
      };
    }
    // Метод принимает новые данные пользователя и добавляет их на страницу
    setUserInfo({ userName, description }) {
      this._userName.textContent = userName;
      this._userDescription.textContent = description;
    }
    // Метод изменения аватара пользователя, обновляет ссылку через src
    setUserAvatar(avatarLink) {
      this._avatarLink.src = avatarLink;
    }
  }