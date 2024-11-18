import './index.css';
import {createCard, deleteCard, likeCard} from './components/card.js';
import {openModal, handleCloseModal, closeModal} from './components/modal.js';
import {enableValidation} from './components/validation.js';
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

// Профиль 
profileEditBtn.addEventListener('click', function() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popupTypeEdit);
    editProfile.querySelector('.popup__button').disabled = true;
    editProfile.querySelector('.popup__button').textContent = 'Сохранить';
});
editProfile.addEventListener('submit', handleProfileSubmit);
function handleProfileSubmit(evt) {
    evt.preventDefault();
    const popupEditBtn = popupTypeEdit.querySelector('.popup__button');
    profileTitle.textContent = nameInput.value;                                    
    profileDescription.textContent = jobInput.value;
    patchProfile(nameInput.value, jobInput.value, popupEditBtn);
    closeModal(popupTypeEdit, editProfile);
};
popupTypeEdit.addEventListener('click', (event) => handleCloseModal(event, editProfile));

// Добавление новой карточки
profileAddBtn.addEventListener('click', function() {
  openModal(popupTypeNewCard);
  newPlace.querySelector('.popup__button').disabled = true;
  newPlace.querySelector('.popup__button').textContent = 'Создать';
});
newPlace.addEventListener('submit', handlePlaceSubmit);
function handlePlaceSubmit(evt) {
  evt.preventDefault();
  const popupNewCardBtn = popupTypeNewCard.querySelector('.popup__button');
  const link = linkInput.value;
  const place = placeInput.value;
  postCard(link, place, popupNewCardBtn);
  closeModal(popupTypeNewCard, newPlace);
};
popupTypeNewCard.addEventListener('click', (event) => handleCloseModal(event, newPlace));

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
  openModal(popupTypeAvatar);
  avatarForm.querySelector('.popup__button').disabled = true;
  avatarForm.querySelector('.popup__button').textContent = 'Сохранить';
});
avatarForm.addEventListener('submit', handleAvatarSubmit);
function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const popupAvatarBtn = popupTypeAvatar.querySelector('.popup__button');
  avatarImage.url = avatarInput.value;
  patchAvatar(avatarImage, popupAvatarBtn);
  closeModal(popupTypeAvatar, avatarForm);
};
popupTypeAvatar.addEventListener('click', (event) => handleCloseModal(event, avatarForm));

// Рендер карточек
export function renderCard (array) {
    array.forEach(function(item) {
        const card = createCard(item.link, item.name, item.likes.length, item.likes, item.owner._id, item._id, deleteCard, likeCard, zoomContentCard);
        placesList.append(card);
    })
};

// Валидация форм
enableValidation();

// API
// 1. Загрузка карточек с сервера
getCardData();

// 2. Загрузка информации о пользователе с сервера
getUsersData ();
