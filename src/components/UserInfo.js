export default class UserInfo {
  constructor(personalName, description) {
    this._name = document.querySelector(personalName).textContent;
    this._description = document.querySelector(description).textContent;
  }

  getUserInfo() {
    const personalInfo = {
      personalName: this._name,
      description: this._description,
    };
    return personalInfo;
  }
  setUserInfo(inputName, inputDescription) {
    const profileName = document.querySelector(".profile__name");
    const profileDescription = document.querySelector(".profile__occupation");
    profileName.textContent = inputName;
    profileDescription.textContent = inputDescription;
  }
}
