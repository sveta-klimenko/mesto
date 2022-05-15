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
  setUserInfo({ inputName, inputDescription }) {
    this._name = inputName;
    this._description = inputDescription;
  }
}
