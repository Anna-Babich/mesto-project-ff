// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard (link, name, deleteBtn) {
    const card = cardTemplate.querySelector('.card');
    const cardContent = card.cloneNode(true);
    const deleteButton = cardContent.querySelector('.card__delete-button');
    cardContent.querySelector('.card__image').src = link;
    cardContent.querySelector('.card__image').alt = link;
    cardContent.querySelector('.card__title').textContent = name;

    deleteButton.addEventListener('click', deleteBtn);

    return cardContent;
}

// @todo: Функция удаления карточки

function deleteCard (event) {
    const deleteItem = event.target.closest('.card');
    return deleteItem.remove();
}

// @todo: Вывести карточки на страницу

function renderCard (array) {
    array.forEach(function(item) {
        const card = createCard(item.link, item.name, deleteCard);
        placesList.append(card);
    })
}

renderCard(initialCards);

