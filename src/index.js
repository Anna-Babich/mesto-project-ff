import './index.css';
import {createCard, deleteCard, likeCard} from './components/card.js';
import {openModal, handleCloseModal, closeModal} from './components/modal.js';
import {clearValidation, enableValidation} from './components/validation.js';
import {patchProfile, postCard, patchAvatar, getCardData, getUsersData} from './components/api.js';

export const cardTemplate = document.querySelector('#card-template').content;
export const placesList = document.querySelector('.places__list');

export const editProfile = document.forms['edit-profile'];
export const nameInput = editProfile.elements.name;
export const jobInput = editProfile.elements.description;
export const popupTypeEdit= document.querySelector('.popup_type_edit');
const profileEditBtn = document.querySelector('.profile__edit-button');

export const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const profileAddBtn = document.querySelector('.profile__add-button');

export const newPlace = document.forms['new-place'];
const placeInput = newPlace.elements['place-name'];
const linkInput = newPlace.elements.link;

export const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');

const avatarImage = document.querySelector('.profile__image');
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
export const avatarForm = document.forms['avatar'];
const avatarInput = avatarForm.elements.avatar;

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Профиль 
profileEditBtn.addEventListener('click', function() {
  openCard(editProfile, validationConfig, popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});
editProfile.addEventListener('submit', handleProfileSubmit);
function handleProfileSubmit(evt) {
  evt.preventDefault();
  const popupEditBtn = popupTypeEdit.querySelector('.popup__button');
  popupEditBtn.textContent = 'Сохранение...';
  patchProfile(nameInput.value, jobInput.value)
  .then((res) => {
    profileTitle.textContent = res.name;                                    
    profileDescription.textContent = res.about;
    closeModal(popupTypeEdit);
  })
  .catch((err) => alert(`Ошибка: ${err}`))
  .finally(() => popupEditBtn.textContent = 'Сохранить')
};
popupTypeEdit.addEventListener('click', handleCloseModal);

// Добавление новой карточки
profileAddBtn.addEventListener('click', function() {
  openCard(newPlace, validationConfig, popupTypeNewCard);
});
newPlace.addEventListener('submit', handlePlaceSubmit);
function handlePlaceSubmit(evt) {
  evt.preventDefault();
  const popupNewCardBtn = popupTypeNewCard.querySelector('.popup__button');
  popupNewCardBtn.textContent = 'Сохранение...';
  const link = linkInput.value;
  const place = placeInput.value;
  postCard(link, place)
  .then((item) => {
    const card = createCard(item.link, item.name, item.likes.length, item.likes, item.owner._id, item._id, deleteCard, likeCard, zoomContentCard, item.owner._id)
    placesList.prepend(card);
    closeModal(popupTypeNewCard)
  })
  .catch((err) => alert(`Ошибка: ${err}`))
  .finally(() => popupNewCardBtn.textContent = 'Создать')
};
popupTypeNewCard.addEventListener('click', handleCloseModal);

// Карточка в полный размер
export function zoomContentCard (evt) {
  if (evt.target.classList.contains('card__image')) {
    openModal(popupTypeImage);
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
  }
};
popupTypeImage.addEventListener('click', handleCloseModal);

// Изменение аватара
avatarImage.addEventListener('click', () => {
  openCard(avatarForm, validationConfig, popupTypeAvatar)
});
avatarForm.addEventListener('submit', handleAvatarSubmit);
function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const popupAvatarBtn = popupTypeAvatar.querySelector('.popup__button');
  popupAvatarBtn.textContent = 'Сохранение...';
  avatarImage.url = avatarInput.value;
  patchAvatar(avatarImage)
  .then((res) => {
    document.querySelector('.profile__image').style.backgroundImage = `url(${res.avatar})`;
    closeModal(popupTypeAvatar)
  })
  .catch((err) => alert(`Ошибка: ${err}`))
  .finally(() => popupAvatarBtn.textContent = 'Сохранить')
};
popupTypeAvatar.addEventListener('click', handleCloseModal);

// Рендер карточек
export function renderCard (array, myId) {
  array.forEach(function(item) {
      const card = createCard(item.link, item.name, item.likes.length, item.likes, item.owner._id, item._id, deleteCard, likeCard, zoomContentCard, myId);
      placesList.append(card);
  })
};

// Валидация форм
enableValidation(validationConfig);
function openCard(form, config, popup) {
  form.reset()
  clearValidation(form, config)
  openModal(popup);
};

// API
let userId;
Promise.all([getUsersData(), getCardData()])
  .then((array) => {
    const [userData, cardList] = array;
    userId = userData._id;

    // Отображаем массив карточек
    renderCard(cardList, userId);
    // Данные профиля
    avatarImage.style.backgroundImage = `url(${userData.avatar})` ;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
  })
  .catch((err) => alert(`Ошибка: ${err}`)); 
