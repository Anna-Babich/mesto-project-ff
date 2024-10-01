// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const deleteButton = cardTemplate.querySelector('.card__delete-button');
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard (link, name, buttonDelete) {
    const cardContent = cardTemplate.querySelector('.card');
    cardTemplate.querySelector('.card__image').src = link;
    cardTemplate.querySelector('.card__title').textContent = name;

    addEventListener('click', buttonDelete)

    return cardContent;
}

// @todo: Функция удаления карточки

function deleteBtn (event) {
    const deleteItem = event.target.closest('.card');
    deleteItem.remove();
}

// @todo: Вывести карточки на страницу

function renderCard (array) {
    array.forEach(function(item) {
        const card = createCard(item.link, item.name, deleteBtn).cloneNode(true);
        placesList.append(card);
    })
}

renderCard(initialCards);

