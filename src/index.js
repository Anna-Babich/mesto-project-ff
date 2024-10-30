import './index.css';
import {initialCards} from './components/cards.js';
import {createCard, deleteCard, likeCard} from './components/card.js';
import {openModal, handleCloseModal, closeModalEcs, closeModal} from './components/modal.js';

export const cardTemplate = document.querySelector('#card-template').content;
export const placesList = document.querySelector('.places__list');

const editProfile = document.forms['edit-profile'];
export const nameInput = editProfile.elements.name;
export const jobInput = editProfile.elements.description;
export const popupTypeEdit= document.querySelector('.popup_type_edit');
const profileEditBtn = document.querySelector('.profile__edit-button');

export const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const profileAddBtn = document.querySelector('.profile__add-button');

const newPlace = document.forms['new-place'];
const placeInput = newPlace.elements['place-name'];
const linkInput = newPlace.elements.link;

export const popupTypeImage= document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


profileEditBtn.addEventListener('click', function() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popupTypeEdit);
})

editProfile.addEventListener('submit', handleProfileSubmit);
function handleProfileSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;                                    
    profileDescription.textContent = jobInput.value;
    closeModal(popupTypeEdit);
};

popupTypeEdit.addEventListener('click', handleCloseModal);


profileAddBtn.addEventListener('click', function() {
    openModal(popupTypeNewCard);
})

popupTypeNewCard.addEventListener('submit', handlePlaceSubmit);
function handlePlaceSubmit(evt) {
    evt.preventDefault();
    const link = linkInput.value;
    const place = placeInput.value;
    const card = createCard(link, place, deleteCard, likeCard, zoomContentCard);
    placesList.prepend(card);
    newPlace.reset();
    closeModal(popupTypeNewCard);
};

popupTypeNewCard.addEventListener('click', handleCloseModal);


export function zoomContentCard (evt) {
    if (evt.target.classList.contains('card__image')) {
        openModal(popupTypeImage);
        popupImage.src = evt.target.src;
        popupImage.alt = evt.target.alt;
        popupCaption.textContent = evt.target.alt;
    }
  };

popupTypeImage.addEventListener('click', handleCloseModal);


export function renderCard (array) {
    array.forEach(function(item) {
        const card = createCard(item.link, item.name, deleteCard, likeCard, zoomContentCard);
        placesList.append(card);
    })
};

renderCard(initialCards);