import {cardTemplate} from '../index.js';

export function createCard (link, name, like, likeArray, idOwner, idCard, deleteBtn, likeBtn, contentImage) {
  const card = cardTemplate.querySelector('.places__item');
  const cardContent = card.cloneNode(true);
  const deleteButton = cardContent.querySelector('.card__delete-button');
  const cardLikeBtn = cardContent.querySelector('.card__like-button');
  const cardImage = cardContent.querySelector('.card__image');
  const cardTitle = cardContent.querySelector('.card__title');
  const likeSpan = cardContent.querySelector('.likes');
  
  viewLikeCount (like, likeSpan);
  viewMyLike (likeArray, cardLikeBtn);
  removeDeleteButton(idOwner, deleteButton);

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  deleteButton.addEventListener('click', (event) => deleteBtn(event, idOwner, idCard));
  cardLikeBtn.addEventListener('click', (event) => likeBtn(event, idCard, likeSpan));
  cardImage.addEventListener('click', contentImage);

  return cardContent;
};

export function deleteCard (event, idOwner, idCard) {
  const deleteItem = event.target.closest('.card');
  deleteItem.remove();
  removeDeleteCard (idOwner, idCard);
};

export function removeDeleteCard (idOwner, idCard) {
  if (idOwner === '357c166adad92a7befb72246') {
    fetch (`https://nomoreparties.co/v1/wff-cohort-26/cards/${idCard}`, {
      method: 'DELETE',
      headers: {
            authorization: 'a2ef26c3-5a50-4a66-8ea0-7a5daae078df'
          }
    })
  };
};


export function likeCard (event, idCard, span) {
  if(event.target.classList.contains('card__like-button')) {
    if(event.target.classList.contains('card__like-button_is-active')) {
      event.target.classList.remove('card__like-button_is-active');
      deleteLikeData(idCard, span)
    } else {
      event.target.classList.add('card__like-button_is-active');
      putLikeData(idCard, span);
    }
  };
};

export function putLikeData (idCard, span) {
  fetch (`https://nomoreparties.co/v1/wff-cohort-26/cards/likes/${idCard}`, {
    method: 'PUT',
    headers: {
      authorization: 'a2ef26c3-5a50-4a66-8ea0-7a5daae078df'
    }
  })
  .then(res => res.json())
  .then(res => {
    span.textContent = res.likes.length;
  });
};

function deleteLikeData (idCard, span) {
  fetch (`https://nomoreparties.co/v1/wff-cohort-26/cards/likes/${idCard}`, {
    method: 'DELETE',
    headers: {
      authorization: 'a2ef26c3-5a50-4a66-8ea0-7a5daae078df'
    }
  })
  .then(res => res.json())
  .then(res => {
    span.textContent = res.likes.length;
  });
};

// Выведение лайков
function viewLikeCount (l, span) {
  if(l == 0){
    span.textContent = '';
  } else {
    span.textContent = l;
  }
};

// проверка моего лайка
function viewMyLike (arrayLike, likeBtn) {
  arrayLike.forEach((item) => {
    if(item._id === '357c166adad92a7befb72246') {
      likeBtn.classList.add('card__like-button_is-active');
    }
  });
};
 
// Удаление 'корзины' у других польхователей
function removeDeleteButton (id, button) {
  if(!(id === '357c166adad92a7befb72246')) {
    button.remove();
  }
};