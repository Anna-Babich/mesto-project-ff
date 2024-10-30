import {cardTemplate, placesList, cardLikeBtn} from '../index.js';

export function createCard (link, name, deleteBtn, likeBtn, contentImage) {
  const card = cardTemplate.querySelector('.places__item');
  const cardContent = card.cloneNode(true);
  const deleteButton = cardContent.querySelector('.card__delete-button');
  const cardLikeBtn = cardContent.querySelector('.card__like-button');
  const cardImage = cardContent.querySelector('.card__image');
  const cardTitle = cardContent.querySelector('.card__title');
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  deleteButton.addEventListener('click', deleteBtn);
  cardLikeBtn.addEventListener('click', likeBtn);
  cardImage.addEventListener('click', contentImage);

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


