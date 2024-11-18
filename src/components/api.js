import {renderCard, profileTitle, profileDescription} from '../index.js';

//1. Загрузка карточек с сервера
export function getCardData() {
    fetch('https://nomoreparties.co/v1/wff-cohort-26/cards', {
      headers: {
        authorization: 'a2ef26c3-5a50-4a66-8ea0-7a5daae078df'
      }
    })
    .then(res => res.json())
    .then((res) => {
        renderCard(res);
    });
};

// 2. Загрузка информации о пользователе с сервера
export function getUsersData () {
    fetch ('https://mesto.nomoreparties.co/v1/wff-cohort-26/users/me', {
      headers: {
        authorization: 'a2ef26c3-5a50-4a66-8ea0-7a5daae078df'
      }
    })
    .then(res => res.json())
    .then((res) => {
        document.querySelector('.profile__image').style.backgroundImage = `url(${res.avatar})` ;
        profileTitle.textContent = res.name;
        profileDescription.textContent = res.about;
    });
};

// 3. Редактирование профиля
export function patchProfile (title, description, btn) {
    btn.textContent = 'Сохранение...';
    fetch('https://nomoreparties.co/v1/wff-cohort-26/users/me', {
      method: 'PATCH',
      headers: {
        authorization: 'a2ef26c3-5a50-4a66-8ea0-7a5daae078df',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: title,
        about: description
      })
    });
};

// 4. Добавление новой карточки на сервер
export function postCard(linkValue, placeValue, btn) {
    btn.textContent = 'Сохранение...';
    fetch('https://nomoreparties.co/v1/wff-cohort-26/cards', {
      method: 'POST',
      headers: {
        authorization: 'a2ef26c3-5a50-4a66-8ea0-7a5daae078df',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      name: placeValue,
      link: linkValue
      })
    });
};

// 5. Изменение аватара на сервере
export function patchAvatar(image, btn) {
    btn.textContent = 'Сохранение...';
    fetch('https://nomoreparties.co/v1/wff-cohort-26/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: 'a2ef26c3-5a50-4a66-8ea0-7a5daae078df',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: image.url
      })
    })
    .then(res => res.json())
    .then((res) => {
      document.querySelector('.profile__image').style.backgroundImage = `url(${res.avatar})`;
    });
};
