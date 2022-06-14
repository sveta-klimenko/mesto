export default class Card {
  constructor(
    data,
    selector,
    myId,
    handleCardClick,
    handleDeleteItem,
    handleLikeItem,
    handleDislikeItem
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._selector = selector;
    this._myId = myId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteItem = handleDeleteItem;
    this._handleLikeItem = handleLikeItem;
    this._handleDislikeItem = handleDislikeItem;
    this._isLiked = false;
    this._element = this._getTemplate().querySelector(".photo-grid__element");
    this._photoGrid = this._element.querySelector(".photo-grid__photo");
    this._like = this._element.querySelector(".photo-grid__like");
    this._deleteBtn = this._element.querySelector(".photo-grid__trash");
    this._likesNumber = this._element.querySelector(".photo-grid__like-number");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content.cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._setLikesNumber();
    this._checkIsLiked();
    this._photoGrid.src = this._link;
    this._photoGrid.alt = this._name;
    this._addDeleteBtn();
    this._element.querySelector(".photo-grid__title").textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  _setLikesNumber() {
    this._likesNumber.textContent = this._likes.length;
  }

  _checkIsLiked() {
    this._likes.forEach((like) => {
      if (like._id === this._myId) {
        this._like.classList.add("photo-grid__like_active");
        this._isLiked = true;
      }
    });
  }

  _addDeleteBtn() {
    if (this._ownerId != this._myId) {
      this._deleteBtn.classList.add("photo-grid__trash-hidden");
      this._deleteBtn.setAttribute("disabled", "disabled");
    }
  }

  toggleLikeBtn(value) {
    this._isLiked = !this._isLiked;
    this._like.classList.toggle("photo-grid__like_active");
    this._likesNumber.textContent = value;
  }

  deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._like.addEventListener("click", () => {
      if (this._isLiked) {
        this._handleDislikeItem();
      } else {
        this._handleLikeItem();
      }
    });
    this._deleteBtn.addEventListener("click", () => this._handleDeleteItem());

    const data = {
      link: this._link,
      name: this._name,
    };
    this._photoGrid.addEventListener("click", () =>
      this._handleCardClick(data)
    );
  }
}
