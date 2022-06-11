import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, handlerSubmit) {
    super(popupSelector);
    this._handlerSubmit = handlerSubmit;
    this._form = this._popup.querySelector(".form");
    this._popupBtn = this._popup.querySelector(".form__save");
    this._popupBtnInitialText = this._popupBtn.textContent;
  }

  handleLoading(isLoading) {
    this._popupBtn.textContent = isLoading
      ? "Удаление..."
      : this._popupBtnInitialText;
  }

  open(card) {
    super.open();
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handlerSubmit(this._card);
    });
  }
}
