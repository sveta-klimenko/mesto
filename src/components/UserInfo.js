export default class UserInfo {
  constructor(personalName, description, iconSelector) {
    this._name = document.querySelector(personalName);
    this._description = document.querySelector(description);
    this._icon = document.querySelector(iconSelector);
  }

  getUserInfo() {
    return {
      personalName: this._name.textContent,
      description: this._description.textContent,
    };
  }
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._description.textContent = data.about;
  }
  setIcon(data) {
    this._icon.src = data.avatar;
  }
}
