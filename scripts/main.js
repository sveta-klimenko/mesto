const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//попапы
const popupPersonal = document.querySelector('.popup_personal-info');
const popupAddPicture = document.querySelector('.popup_add-picture');
const popupShowPicture = document.querySelector('.popup_show-picture');

//кнопки открытия попапов
const openProfilePopupBtn = document.querySelector('.profile__change-info');
const openAddPicturePopupBtn = document.querySelector('.profile__add-picture')

//кнопки закрытия попапов
const closeProfileBtn = popupPersonal.querySelector('.popup__close');
const closeAddPictureBtn = popupAddPicture.querySelector('.popup__close');

//формы для сохранения
const popupForm = popupPersonal.querySelector('.form_personal');
const popupFormImage = popupAddPicture.querySelector('.form_new-image');

//персональная информация на странице
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__occupation');

//поля для персональной информации
const inputName = popupPersonal.querySelector('.info_name');
const inputDescription = popupPersonal.querySelector('.info_description');

//поля для информации об изображении
const inputPlaceName = popupAddPicture.querySelector('.info_place-name');
const inputPlaceLink = popupAddPicture.querySelector('.info_place-link');

//темплейты 
const cardTemplate = document.querySelector('.image-card');

//место для карточек
const photoGrid = document.querySelector('.photo-grid');

//поля попапа с картинкой
const popupImage = document.querySelector('.popup__image')
const popupDescription = document.querySelector('.popup__description')


function openPopup(popup) {
  popup.classList.add('popup__opened');
}

function closePopup(popup) {
  popup.classList.remove('popup__opened');
}

function getPersonalInfo(popup) {
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

function saveCard(evt) {
  evt.preventDefault();
  const newInfo = {
    name: inputPlaceName.value,
    link: inputPlaceLink.value
  };
  const newCard = createCard(newInfo);
  photoGrid.prepend(newCard);
  closePopup(popupAddPicture); 
}

function getImagePopupData(card) {
  popupImage.scr = card.querySelector('.photo-grid__photo').src;
  openPopup(popupShowPicture);
}

function createCard(data) {
  const card = cardTemplate.content.cloneNode(true);
  
  const likeBtn = card.querySelector('.photo-grid__like');
  likeBtn.addEventListener('click', function(evt){
    evt.target.classList.toggle('photo-grid__like_active');
  })
  
  const trashBtn = card.querySelector('.photo-grid__trash');
  trashBtn.addEventListener('click', function(){
    trashBtn.closest('.photo-grid__element').remove();
  })

  const imageBtn = card.querySelector('.photo-grid__photo');
  imageBtn.addEventListener('click', getImagePopupData(card))

  card.querySelector('.photo-grid__photo').src = data.link;
  card.querySelector('.photo-grid__photo').alt = data.name;
  card.querySelector('.photo-grid__title').textContent = data.name;
  
  return card;
};

function getCards(data){
  data.forEach(place => {
    const newCard = createCard(place);
    photoGrid.append(newCard);
  });
}
getCards(initialCards)

openProfilePopupBtn.addEventListener('click', function(){
  getPersonalInfo(popupPersonal);
})
openAddPicturePopupBtn.addEventListener('click', function(){
  openPopup(popupAddPicture);
})
closeProfileBtn.addEventListener('click', function(){
  closePopup(popupPersonal);
})
closeAddPictureBtn.addEventListener('click', function(){
  closePopup(popupAddPicture);
})
popupForm.addEventListener('submit', saveInfo);
popupFormImage.addEventListener('submit', saveCard);

