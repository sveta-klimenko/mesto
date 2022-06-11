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
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content.cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setLikesNumber();
    this._checkIsLiked();
    const photoGrid = this._element.querySelector(".photo-grid__photo");
    photoGrid.src = this._link;
    photoGrid.alt = this._name;
    this._addDeleteBtn();
    this._element.querySelector(".photo-grid__title").textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  _setLikesNumber() {
    const likes = this._element.querySelector(".photo-grid__like-number");
    likes.textContent = this._likes.length;
  }

  _checkIsLiked() {
    if (this._likes[0] && this._likes[0]._id == this._myId) {
      console.log("Эта карточка лайкнута мной");
      this._element
        .querySelector(".photo-grid__like")
        .classList.add("photo-grid__like_active");
      this._isLiked = true;
    }
  }

  _addDeleteBtn() {
    const card = this._element.querySelector(".photo-grid__element");
    if (this._ownerId == this._myId) {
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("photo-grid__trash");
      deleteBtn.ariaLabel = "Удалить изображение";
      card.appendChild(deleteBtn);
    }
  }

  toggleLikeBtn() {
    this._isLiked = !this._isLiked;
    console.log(this._templateCopy);
    this._templateCopy
      .querySelector(".photo-grid__like")
      .classList.toggle("photo-grid__like_active");
  }

  deleteCard() {
    console.log("удаляю");
    console.log(this._templateCopy);
    this._templateCopy.remove();
  }

  _setEventListeners() {
    this._templateCopy = this._element
      .querySelector(".photo-grid__element")
      .cloneNode(true);
    this._element
      .querySelector(".photo-grid__like")
      .addEventListener("click", () => {
        if (this._isLiked) {
          this._handleDislikeItem();
        } else {
          this._handleLikeItem();
        }
      });
    if (this._element.querySelector(".photo-grid__trash") != null) {
      this._element
        .querySelector(".photo-grid__trash")
        .addEventListener("click", () => this._handleDeleteItem());
    }

    const data = {
      link: this._link,
      name: this._name,
    };
    this._element
      .querySelector(".photo-grid__photo")
      .addEventListener("click", () => this._handleCardClick(data));
  }
}
