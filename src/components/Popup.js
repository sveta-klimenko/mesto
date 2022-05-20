export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._closePopupBtn = this._popup.querySelector(".popup__close");
  }

  open() {
    this._popup.classList.add("popup__opened");
    document.addEventListener("keydown", this._addEscCloseListener);
  }

  close() {
    this._popup.classList.remove("popup__opened");
    document.removeEventListener("keydown", this._addEscCloseListener);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _addEscCloseListener = (event) => this._handleEscClose(event);

  _handleClickClose(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", (event) =>
      this._handleClickClose(event)
    );
    this._closePopupBtn.addEventListener("click", () => this.close());
  }
}
