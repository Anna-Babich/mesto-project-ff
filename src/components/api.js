const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-26", 
  headers: {
    authorization: 'a2ef26c3-5a50-4a66-8ea0-7a5daae078df',
    "Content-Type": "application/json",
  },
};

function getResponseData(res) {
  if(!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  } 
  return res.json();
}

//1. Загрузка карточек с сервера
export function getCardData() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers, 
  })
  .then((res) => getResponseData(res))
};

// 2. Загрузка информации о пользователе с сервера
export function getUsersData () {
  return fetch (`${config.baseUrl}/users/me`, {
    headers: config.headers, 
  })
  .then((res) => getResponseData(res))
};

// 3. Редактирование профиля
export function patchProfile (title, description) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: title,
      about: description
    })
  })
  .then((res) => getResponseData(res));
};

// 4. Добавление новой карточки на сервер
export function postCard(linkValue, placeValue) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: placeValue,
      link: linkValue
    })
  })
  .then((item) => getResponseData(item));
};

// 5. Изменение аватара на сервере
export function patchAvatar(image) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: image.url
    })
  })
  .then((res) => getResponseData(res))
};

// 6. удаление карточки
export function removeDeleteCard (idCard) {
  return fetch (`${config.baseUrl}/cards/${idCard}`, {
      method: 'DELETE',
      headers: config.headers
    })
  .then((res) => getResponseData(res))
};

// 7. постановка лайка
export function putLikeData (idCard) {
  return fetch (`${config.baseUrl}/cards/likes/${idCard}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then((res) => getResponseData(res))
};

// 8. удаление лайка
export function deleteLikeData (idCard) {
  return fetch (`${config.baseUrl}/cards/likes/${idCard}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => getResponseData(res))
};