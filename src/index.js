import './index.css';
import {initialCards, createCard, deleteCard, likeCard, contentCard, renderCard} from './components/cards.js';
import {openModal, closeModal, closeModalEcs} from './components/modal.js';

export const cardTemplate = document.querySelector('#card-template').content;
export const placesList = document.querySelector('.places__list');

const editProfile = document.forms['edit-profile'];
export const nameInput = editProfile.elements.name;
export const jobInput = editProfile.elements.description;
export const popup1 = document.querySelector('.popup_type_edit');
const profileEditBtn = document.querySelector('.profile__edit-button');

export const popup2 = document.querySelector('.popup_type_new-card');
const profileAddBtn = document.querySelector('.profile__add-button');

const newPlace = document.forms['new-place'];
const placeInput = newPlace.elements['place-name'];
const linkInput = newPlace.elements.link;

export const popup3 = document.querySelector('.popup_type_image');


renderCard(initialCards);

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;                                    
    profileDescription.textContent = jobInput.value;
    popup1.classList.remove('popup_is-opened');
};
 
profileEditBtn.addEventListener('click', openModal);
popup1.addEventListener('submit', handleFormSubmit);
popup1.addEventListener('click', closeModal);
popup1.addEventListener('keydown', closeModalEcs);

profileAddBtn.addEventListener('click', openModal);
popup2.addEventListener('click', closeModal);
popup2.addEventListener('keydown', closeModalEcs);
popup2.addEventListener('submit', placeFormSubmit);
 
function placeFormSubmit(evt) {
    evt.preventDefault();
    const link = linkInput.value;
    const place = placeInput.value;
    const card = createCard(link, place, deleteCard, likeCard, contentCard);
    placesList.prepend(card);
    newPlace.reset();
    popup2.classList.remove('popup_is-opened');
};

