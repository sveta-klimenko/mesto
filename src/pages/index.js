import Api from "../components/Api.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import FormValidator from "../components/FormValidator.js";
import { validationList } from "../utils/initial-cards.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "../styles/index.css";

//попапы
const popupPersonal = document.querySelector(".popup_personal-info");
const popupAddPicture = document.querySelector(".popup_add-picture");
const popupChangeIcon = document.querySelector(".popup_change-icon");

//кнопки открытия попапов
const btnOpenProfilePopup = document.querySelector(".profile__change-info");
const btnOpenAddPicturePopup = document.querySelector(".profile__add-picture");
const btnOpenChangeIconPopup = document.querySelector(".profile__avatar-edit");

//поля для персональной информации
const inputName = popupPersonal.querySelector(".info_name");
const inputDescription = popupPersonal.querySelector(".info_description");

const popupWithImage = new PopupWithImage(".popup_show-picture");
const popupAddPictureItem = new PopupWithForm(".popup_add-picture", (data) =>
  addNewCardApi(data)
);
const popupChangeIconItem = new PopupWithForm(".popup_change-icon", (data) =>
  updateAvatarApi(data)
);
const popupPersonalItem = new PopupWithForm(".popup_personal-info", (data) =>
  updatePersonalInfoApi(data)
);
const popupDeleteCard = new PopupWithSubmit(".popup_delete", (data) =>
  deleteCardApi(data)
);

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__occupation",
  ".profile__avatar"
);

const api = new Api({
  url: "https://nomoreparties.co/v1/cohort-42/",
  headers: {
    authorization: "7ccf8939-dd66-46c7-841c-93db6f266356",
    "content-Type": "application/json",
  },
});

const cardsList = new Section(
  {
    renderer: (data) => cardsList.addItem(generateNewCard(data)),
  },
  ".photo-grid"
);

let myId = "";

const getStartInfoApi = () => {
  Promise.all([api.getCards(), api.getPersonalInfo()])
    .then((res) => {
      const [cardData, PersonalInfoData] = res;
      myId = PersonalInfoData._id;
      cardsList.renderItems(cardData);
      userInfo.setUserInfo(PersonalInfoData);
      userInfo.setIcon(PersonalInfoData);
    })
    .catch((err) => console.log(err));
};

getStartInfoApi();

function addNewCardApi(data) {
  api
    .createCard(data)
    .then((res) => {
      cardsList.addNewCard(generateNewCard(res));
      popupAddPictureItem.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupAddPictureItem.handleLoading(false));
}

function updatePersonalInfoApi(data) {
  api
    .updatePersonalInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupPersonalItem.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupPersonalItem.handleLoading(false));
}

function updateAvatarApi(data) {
  api
    .updateAvatar(data)
    .then((res) => {
      userInfo.setIcon(res);
      popupChangeIconItem.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupChangeIconItem.handleLoading(false));
}

function deleteCardApi(card) {
  popupDeleteCard.handleLoading(true);
  api
    .deleteCard(card._cardId)
    .then(() => {
      card.deleteCard();
      popupDeleteCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupDeleteCard.handleLoading(false));
}

function likeCardApi(card) {
  api
    .likeCard(card._cardId)
    .then((res) => card.toggleLikeBtn(res.likes.length))
    .catch((err) => console.log(err));
}

function dislikeCardApi(card) {
  api
    .dislikeCard(card._cardId)
    .then((res) => card.toggleLikeBtn(res.likes.length))
    .catch((err) => console.log(err));
}

const openImagePopup = (data) => {
  popupWithImage.open(data);
};

const openDeletePopup = (data) => {
  popupDeleteCard.open(data);
};

const generateNewCard = (data) => {
  const card = new Card(
    data,
    ".image-card",
    myId,
    openImagePopup,
    () => openDeletePopup(card),
    () => likeCardApi(card),
    () => dislikeCardApi(card)
  );
  return card.generateCard();
};

popupWithImage.setEventListeners();
popupPersonalItem.setEventListeners();
popupAddPictureItem.setEventListeners();
popupChangeIconItem.setEventListeners();
popupDeleteCard.setEventListeners();

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

const popupAddPictureValidation = new FormValidator(
  validationList,
  popupAddPicture
);
popupAddPictureValidation.enableValidation();

btnOpenAddPicturePopup.addEventListener("click", function () {
  popupAddPictureValidation.resetErrors();
  popupAddPictureItem.open();
});

const popupChangeIconValidation = new FormValidator(
  validationList,
  popupChangeIcon
);
popupChangeIconValidation.enableValidation();

btnOpenChangeIconPopup.addEventListener("click", function () {
  popupChangeIconValidation.resetErrors();
  popupChangeIconItem.open();
});
