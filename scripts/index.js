import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards, validationList } from "./initial-cards.js";
import { openPopup, popupShowPicture, closePopup } from "./utils.js";

//попапы
const popupPersonal = document.querySelector(".popup_personal-info");
const popupAddPicture = document.querySelector(".popup_add-picture");

//кнопки открытия попапов
const btnOpenProfilePopup = document.querySelector(".profile__change-info");
const btnOpenAddPicturePopup = document.querySelector(".profile__add-picture");

//кнопки закрытия попапов
const btnCloseProfile = popupPersonal.querySelector(".popup__close");
const btnCloseAddPicture = popupAddPicture.querySelector(".popup__close");
const btnCloseShowPicture = popupShowPicture.querySelector(".popup__close");

//формы для сохранения
const popupProfileForm = popupPersonal.querySelector(".form_personal");
const popupFormImage = popupAddPicture.querySelector(".form_new-image");

//персональная информация на странице
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__occupation");

//поля для персональной информации
const inputName = popupPersonal.querySelector(".info_name");
const inputDescription = popupPersonal.querySelector(".info_description");

//поля для информации об изображении
const inputPlaceName = popupAddPicture.querySelector(".info_place-name");
const inputPlaceLink = popupAddPicture.querySelector(".info_place-link");

//темплейты
const cardTemplate = document.querySelector(".image-card");

//место для карточек
const photoGrid = document.querySelector(".photo-grid");

function getPersonalInfo(popup) {
  profilePopupValidation.resetErrors();
  openPopup(popup);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function saveInfo(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupPersonal);
}

function generateCardItem(data) {
  const card = new Card(data, ".image-card");
  const cardElement = card.generateCard();
  return cardElement;
}
function saveCard(evt) {
  evt.preventDefault();
  const newInfo = {
    name: inputPlaceName.value,
    link: inputPlaceLink.value,
  };
  const cardElement = generateCardItem(newInfo);
  photoGrid.prepend(cardElement);
  popupFormImage.reset();
  closePopup(popupAddPicture);
}

function getCards(data) {
  data.forEach((place) => {
    const cardElement = generateCardItem(place);
    photoGrid.append(cardElement);
  });
}
getCards(initialCards);

const profilePopupValidation = new FormValidator(validationList, popupPersonal);
profilePopupValidation.enableValidation();
const popupAddPictureValidation = new FormValidator(
  validationList,
  popupAddPicture
);
popupAddPictureValidation.enableValidation();

btnOpenProfilePopup.addEventListener("click", function () {
  getPersonalInfo(popupPersonal);
});

btnOpenAddPicturePopup.addEventListener("click", function () {
  popupAddPictureValidation.resetErrors();
  openPopup(popupAddPicture);
});

btnCloseProfile.addEventListener("click", function () {
  closePopup(popupPersonal);
});
btnCloseAddPicture.addEventListener("click", function () {
  closePopup(popupAddPicture);
});
btnCloseShowPicture.addEventListener("click", function () {
  closePopup(popupShowPicture);
});

popupProfileForm.addEventListener("submit", saveInfo);
popupFormImage.addEventListener("submit", saveCard);
