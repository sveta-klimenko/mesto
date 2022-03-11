const popup = document.querySelector('.popup');

const openPopupBtn = document.querySelector('.profile__change-info');
const closePopupBtn = popup.querySelector('.popup__close');
const popupForm = popup.querySelector('.popup__form');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__occupation');

const inputName = popup.querySelector('.info_name');
const inputDescription = popup.querySelector('.info_description');

const likeBtns = document.querySelectorAll('photo-grid__like');

function openPopup() {
  popup.classList.add('popup__opened');
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  console.log('openPopup');
}

function closePopup() {
  popup.classList.remove('popup__opened');
}

function saveInfo(evt) {
  evt.preventDefault();
  console.log('Страница не перезагружается');
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  popup.classList.remove('popup__opened');
}

function toggleLike() {
  popup.classList.toggle('photo-grid__like-active');
}

openPopupBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);
popupForm.addEventListener('submit', saveInfo);
for (let i = 0; i < likeBtns.length; i++) {
  likeBtns[i].addEventListener('click', toggleLike);
};