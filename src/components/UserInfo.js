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
  setUserInfo({ personalName, description }) {
    this._name.textContent = personalName;
    this._description.textContent = description;
  }
  setIcon(data) {
    debugger;
    this._icon.src = data.icon;
  }
}
