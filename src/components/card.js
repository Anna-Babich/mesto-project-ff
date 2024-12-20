import {cardTemplate} from '../index.js';
import {removeDeleteCard, putLikeData, deleteLikeData} from '../components/api.js';

export function createCard (link, name, like, likeArray, idOwner, idCard, deleteBtn, likeBtn, contentImage, myId) {
  const card = cardTemplate.querySelector('.places__item');
  const cardContent = card.cloneNode(true);
  const deleteButton = cardContent.querySelector('.card__delete-button');
  const cardLikeBtn = cardContent.querySelector('.card__like-button');
  const cardImage = cardContent.querySelector('.card__image');
  const cardTitle = cardContent.querySelector('.card__title');
  const likeSpan = cardContent.querySelector('.likes');

  viewLikeCount(like, likeSpan);
  viewMyLike(likeArray, cardLikeBtn, myId);
  removeDeleteButton(idOwner, deleteButton, myId);

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  deleteButton.addEventListener('click', (event) => deleteBtn(event, idCard));
  cardLikeBtn.addEventListener('click', (event) => likeBtn(event, idCard, likeSpan));
  cardImage.addEventListener('click', contentImage);

  return cardContent;
};


export function deleteCard (event, idCard) {
  removeDeleteCard (idCard)
  .then((res) => {
    const deleteItem = event.target.closest('.card');
    deleteItem.remove();
  })
  .catch((err) => alert(`Ошибка: ${err}`));
};


export function likeCard (event, idCard, span) {
  if(event.target.classList.contains('card__like-button')) {
    if(event.target.classList.contains('card__like-button_is-active')) {
      deleteLikeData(idCard)
        .then(res => {
          event.target.classList.remove('card__like-button_is-active');
          span.textContent = res.likes.length;
        })
        .catch((err) => alert(`Ошибка: ${err}`));
    } else {
      putLikeData(idCard)
        .then((res) => {
          event.target.classList.add('card__like-button_is-active');
          span.textContent = res.likes.length;
        })
        .catch((err) => alert(`Ошибка: ${err}`));
    }
  };
};


// Выведение лайков
function viewLikeCount (l, span) {
  if(l === 0){
    span.textContent = 0;
  } else {
    span.textContent = l;
  }
};


// проверка моего лайка
function viewMyLike (arrayLike, likeBtn, myId) {
  arrayLike.some((item) => {
    item._id === myId
    return likeBtn.classList.add('card__like-button_is-active');
  })
}

// Удаление 'корзины' у других польхователей
function removeDeleteButton (id, button, myId) {
  if(!(id === myId)) {
    button.remove();
  }
};