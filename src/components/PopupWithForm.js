import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handlerFormSubmit) {
    super(popupSelector);
    this._handlerFormSubmit = handlerFormSubmit;
    this._inputsValue = this._popup.querySelectorAll(".info");
    this._popupForm = this._popup.querySelector(".form");
    this._popupBtn = this._popup.querySelector(".form__save");
    this._popupBtnInitialText = this._popupBtn.textContent;
  }

  handleLoading(isLoading) {
    this._popupBtn.textContent = isLoading
      ? "Сохранение..."
      : this._popupBtnInitialText;
  }

  _getInputValues() {
    const inputList = {};
    this._inputsValue.forEach((input) => {
      inputList[input.name] = input.value;
    });
    return inputList;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._submitHandler);
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  _submitHandler = (event) => {
    event.preventDefault();
    this.handleLoading(true);
    this._handlerFormSubmit(this._getInputValues());
  };
}
