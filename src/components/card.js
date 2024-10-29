import {cardTemplate, placesList} from '../index.js';

export function createCard (link, name, deleteBtn, likeBtn, contentImage) {
  const card = cardTemplate.querySelector('.places__item');
  const cardContent = card.cloneNode(true);
  const deleteButton = cardContent.querySelector('.card__delete-button');
  cardContent.querySelector('.card__image').src = link;
  cardContent.querySelector('.card__image').alt = name;
  cardContent.querySelector('.card__title').textContent = name;

  deleteButton.addEventListener('click', deleteBtn);
  cardContent.addEventListener('click', likeBtn);
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


