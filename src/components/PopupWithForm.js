import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handlerFormSubmit) {
    super(popupSelector);
    this._handlerFormSubmit = handlerFormSubmit;
    this._inputsValue = this._popup.querySelectorAll(".info");
    this._popupForm = this._popup.querySelector(".form");
  }

  _getInputValues() {
    const inputList = {};
    this._inputsValue.forEach((input) => {
      inputList[input.name] = input.value;
    });
    return inputList;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._submitHandler = (event) => {
      event.preventDefault();
      this._handlerFormSubmit(this._getInputValues());
      this.close();
    };
    this._popupForm.addEventListener("submit", this._submitHandler);
  }

  close() {
    super.close();
    this._popupForm.removeEventListener("submit", this._submitHandler);
    this._popupForm.reset();
  }
}
