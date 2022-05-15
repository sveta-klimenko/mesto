export default class UserInfo {
  constructor(personalName, description) {
    this._name = document.querySelector(personalName).textContent;
    this._description = document.querySelector(description).textContent;
  }

  getUserInfo() {
    return {
      personalName: this._name,
      description: this._description,
    };
  }
  setUserInfo({ personalName, description }) {
    this._name = personalName;
    this._description = description;
  }
}
