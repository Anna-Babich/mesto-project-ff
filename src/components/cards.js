import {cardTemplate, placesList, popup3} from '../index.js';
import {closeModal} from './modal.js';

 export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

export function createCard (link, name, deleteBtn, likeBtn, contentImage) {
  const card = cardTemplate.querySelector('.card');
  const cardContent = card.cloneNode(true);
  const deleteButton = cardContent.querySelector('.card__delete-button');
  cardContent.querySelector('.card__image').src = link;
  cardContent.querySelector('.card__image').alt = name;
  cardContent.querySelector('.card__title').textContent = name;

  deleteButton.addEventListener('click', deleteBtn);
  placesList.addEventListener('click', likeBtn);
  placesList.addEventListener('click', contentImage);

  return cardContent;
};

export function deleteCard (event) {
  const deleteItem = event.target.closest('.card');
  return deleteItem.remove();
};

export function likeCard (evt) {
  if(evt.target.classList.contains('card__like-button')) {
      evt.target.classList.toggle('card__like-button_is-active');
  }
};

export function contentCard (evt) {
  const popupImage = popup3.querySelector('.popup__image');
  const popupCaption = popup3.querySelector('.popup__caption');
  if (evt.target.classList.contains('card__image')) {
      popup3.classList.add('popup_is-opened');
      popupImage.src = evt.target.src;
      popupCaption.textContent = evt.target.alt;
      
      popup3.addEventListener('click', closeModal);
  }
};

export function renderCard (array) {
  array.forEach(function(item) {
      const card = createCard(item.link, item.name, deleteCard, likeCard, contentCard);
      placesList.append(card);
  })
};

