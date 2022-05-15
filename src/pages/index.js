import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards, validationList } from "../components/initial-cards.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "../styles/index.css";

//попапы
const popupPersonal = document.querySelector(".popup_personal-info");
const popupAddPicture = document.querySelector(".popup_add-picture");

//кнопки открытия попапов
const btnOpenProfilePopup = document.querySelector(".profile__change-info");
const btnOpenAddPicturePopup = document.querySelector(".profile__add-picture");

//поля для персональной информации
const inputName = popupPersonal.querySelector(".info_name");
const inputDescription = popupPersonal.querySelector(".info_description");

const popupWithImage = new PopupWithImage(".popup_show-picture");

const openPopup = (data) => {
  popupWithImage.open(data);
};

popupWithImage.setEventListeners();

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(data, ".image-card", openPopup);
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    },
  },
  ".photo-grid"
);
cardsList.renderItems();

const userInfo = new UserInfo(".profile__name", ".profile__occupation");

const popupPersonalItem = new PopupWithForm(".popup_personal-info", (data) => {
  userInfo.setUserInfo(data);
});

popupPersonalItem.setEventListeners();

const popupPersonalValidation = new FormValidator(
  validationList,
  popupPersonal
);
popupPersonalValidation.enableValidation();

btnOpenProfilePopup.addEventListener("click", function () {
  popupPersonalValidation.resetErrors();
  popupPersonalItem.open();
  const info = userInfo.getUserInfo();
  inputName.value = info.personalName;
  inputDescription.value = info.description;
});

const popupAddPictureItem = new PopupWithForm(".popup_add-picture", (data) => {
  const card = new Card(data, ".image-card", openPopup);
  const cardElement = card.generateCard();
  cardsList.addNewCard(cardElement);
});

popupAddPictureItem.setEventListeners();

const popupAddPictureValidation = new FormValidator(
  validationList,
  popupAddPicture
);
popupAddPictureValidation.enableValidation();

btnOpenAddPicturePopup.addEventListener("click", function () {
  popupAddPictureValidation.resetErrors();
  popupAddPictureItem.open();
});
