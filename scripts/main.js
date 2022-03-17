const popup = document.querySelector('.popup');

const openPopupBtn = document.querySelector('.profile__change-info');
const closePopupBtn = popup.querySelector('.popup__close');
const popupForm = popup.querySelector('.form');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__occupation');

const inputName = popup.querySelector('.info_name');
const inputDescription = popup.querySelector('.info_description');

function openPopup() {
  popup.classList.add('popup__opened');
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function closePopup() {
  popup.classList.remove('popup__opened');
}

function saveInfo(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  popup.classList.remove('popup__opened');
}

openPopupBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);
popupForm.addEventListener('submit', saveInfo);
