import { getImagePopupData } from "./utils.js";

export default class Card {
  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content.cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const photoGrid = this._element.querySelector(".photo-grid__photo");
    photoGrid.src = this._link;
    photoGrid.alt = this._name;
    this._element.querySelector(".photo-grid__title").textContent = this._name;
    return this._element;
  }

  _toggleLikeBtn(evt) {
    evt.target.classList.toggle("photo-grid__like_active");
  }

  _deleteCard(evt) {
    evt.target.closest(".photo-grid__element").remove();
  }
  _setEventListeners() {
    this._element
      .querySelector(".photo-grid__like")
      .addEventListener("click", (evt) => this._toggleLikeBtn(evt));

    this._element
      .querySelector(".photo-grid__trash")
      .addEventListener("click", (evt) => this._deleteCard(evt));

    const data = {
      link: this._link,
      name: this._name,
    };

    this._element
      .querySelector(".photo-grid__photo")
      .addEventListener("click", () => getImagePopupData(data));
  }
}
