export default class Card {
  constructor(data, selector, myId, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._selector = selector;
    this._myId = myId;
    this._handleCardClick = handleCardClick;
    this._isLiked = false;
    debugger;
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
    this._setLikesNumber();
    this._checkIsLiked();
    const photoGrid = this._element.querySelector(".photo-grid__photo");
    photoGrid.src = this._link;
    photoGrid.alt = this._name;
    this._element.querySelector(".photo-grid__title").textContent = this._name;
    return this._element;
  }

  _setLikesNumber() {
    const likes = this._element.querySelector(".photo-grid__like-number");
    likes.textContent = this._likes.length;
  }

  _checkIsLiked() {
    if (this._likes[0] && this._likes[0]._id == this._myId) {
      console.log("Эта карточка лайкнута мной");
      this._addLikeBtn();
      this._isLiked = true;
    }
  }

  _toggleLikeBtn(evt) {
    evt.target.classList.toggle("photo-grid__like_active");
  }

  _addLikeBtn(evt) {
    evt.target.classList.add("photo-grid__like_active");
    this._isLiked = true;
  }

  _removeLikeBtn(evt) {
    evt.target.classList.remove("photo-grid__like_active");
    this._isLiked = false;
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
    debugger;
    this._element
      .querySelector(".photo-grid__photo")
      .addEventListener("click", () => this._handleCardClick(data));
  }
}
