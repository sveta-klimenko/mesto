const popupShowPicture = document.querySelector(".popup_show-picture");

function getImagePopupData(data) {
  const popupImage = document.querySelector(".popup__image");
  const popupDescription = document.querySelector(".popup__description");

  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupDescription.textContent = data.name;
  openPopup(popupShowPicture);
}

function openPopup(popup) {
  document.addEventListener("keydown", closeOnEsc);
  popup.addEventListener("click", closeOnClick);
  popup.classList.add("popup__opened");
}

function closePopup(popup) {
  document.removeEventListener("keydown", closeOnEsc);
  popup.removeEventListener("click", closeOnClick);
  popup.classList.remove("popup__opened");
}

function closeOnEsc(event) {
  const popupOpened = document.querySelector(".popup__opened");
  if (event.key === "Escape") {
    closePopup(popupOpened);
  }
}

function closeOnClick(event) {
  const popupOpened = document.querySelector(".popup__opened");
  if (event.target === event.currentTarget) {
    console.log(popupOpened);
    closePopup(popupOpened);
  }
}

export { getImagePopupData, openPopup, closePopup, popupShowPicture };
