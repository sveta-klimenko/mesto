export default class UserInfo {
  constructor(personalName, description) {
    this._name = document.querySelector(personalName);
    this._description = document.querySelector(description);
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
}
