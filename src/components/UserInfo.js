export class UserInfo {
  // Принимает объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе
  constructor({userNameSelector, userDescriptionSelector, userAvatarSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
    this._avatarLink = document.querySelector(userAvatarSelector);
  }

  setFullInfo({ about, avatar, name, _id: userId }){
    this.setUserId(userId);
    this.setUserInfo({ userName: name, description: about });
    this.setUserAvatar(avatar);
  };

  // Метод принимает новые данные Профиля пользователя записывает их в экземпляре класса и
  //запускает функцию изменения информации в дом элементе для Профиля
  setUserInfo({ userName, description }) {
    this.about = description;
    this.name = userName;
    this._pasteUserInfo()
  }

  // Метод принимает новые данные Аватара пользователя записывает их в экземпляре класса и
  //запускает функцию изменения информации в дом элементе для Аватарки
  setUserAvatar(avatarLink) {
    this.avatar = avatarLink
    this._pasteAvatar();
  }

  // Метод принимает новые данные ИД пользователя записывает их в экземпляре класса
  setUserId(userId) {
    this.userId = userId;
  }

  // Метод вставляет картинку Аватара через src в елемент дома
  _pasteAvatar(){
    this._avatarLink.src = this.avatar;
  }

  // Метод записывает данные Профиля в елемент дома
  _pasteUserInfo() {
    this._userName.textContent = this.name;
    this._userDescription.textContent = this.about;
  }

  // Метод возвращает объект с данными пользователя
  getUserInfo() {
    return {
      userName: this.name,
      description: this.about
    };
  }

  // Метод возвращает данные ИД пользователя
  getUserId() {
    return this.userId;
  }
}