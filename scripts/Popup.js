export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._closePopupBtn = this._popup.querySelector(".popup__close");
  }

  open() {
    this._popup.classList.add("popup__opened");
    this._setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup__opened");
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleClickClose(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  _setEventListeners() {
    document.addEventListener("keydown", (event) =>
      this._handleEscClose(event)
    );
    this._popup.addEventListener("click", (event) =>
      this._handleClickClose(event)
    );
    this._closePopupBtn.addEventListener("click", () => this.close());
  }
}
