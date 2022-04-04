//попапы
const popups = document.querySelectorAll('.popup');
const popupPersonal = document.querySelector('.popup_personal-info');
const popupAddPicture = document.querySelector('.popup_add-picture');
const popupShowPicture = document.querySelector('.popup_show-picture');

//кнопки открытия попапов
const openProfilePopupBtn = document.querySelector('.profile__change-info');
const openAddPicturePopupBtn = document.querySelector('.profile__add-picture')

//кнопки закрытия попапов
const closeProfileBtn = popupPersonal.querySelector('.popup__close');
const closeAddPictureBtn = popupAddPicture.querySelector('.popup__close');
const closeShowPictureBtn = popupShowPicture.querySelector('.popup__close');

//формы для сохранения
const popupProfileForm = popupPersonal.querySelector('.form_personal');
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

function closeOnEsc (event, popup) {
  if (event.key === 'Escape') {
    closePopup(popup);
  };
}

function closeOnClick (event, popup) {
  if (event.target === event.currentTarget) {
    closePopup(popup);
  };
}

function openPopup(popup) {
  document.addEventListener('keydown', (event) => closeOnEsc(event, popup));
  popup.addEventListener('click', (event) => closeOnClick(event, popup));
  popup.classList.add('popup__opened');
}

function closePopup(popup) {
  document.removeEventListener('keydown', (event) => closeOnEsc(event, popup));
  popup.removeEventListener('click', (event) => closeOnClick(event, popup));
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
  popupFormImage.reset()
  closePopup(popupAddPicture); 
}

function getImagePopupData(data) {
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupDescription.textContent = data.name;
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
  imageBtn.addEventListener('click', () => getImagePopupData(data));

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
closeShowPictureBtn.addEventListener('click', function(){
  closePopup(popupShowPicture);
})

popupProfileForm.addEventListener('submit', saveInfo);
popupFormImage.addEventListener('submit', saveCard);

