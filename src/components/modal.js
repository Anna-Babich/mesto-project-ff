import {popup1, popup2, nameInput, jobInput} from '../index.js';

export function openModal (evt) {
    if(evt.currentTarget.classList.contains('profile__edit-button')) {
        popup1.classList.add('popup_is-opened');
        nameInput.value = document.querySelector('.profile__title').textContent;
        jobInput.value = document.querySelector('.profile__description').textContent;
    } else if (evt.currentTarget.classList.contains('profile__add-button')) {
        popup2.classList.add('popup_is-opened');
    }
};

export function closeModal (evt) {
    if(evt.target.classList.contains('popup__close')) {
        evt.currentTarget.classList.remove('popup_is-opened');
    } else if (evt.target.classList.contains('popup')) {
        evt.currentTarget.classList.remove('popup_is-opened');
    }
};

export function closeModalEcs (event) {
    if (event.key === "Escape") {
        event.currentTarget.classList.remove('popup_is-opened');
    }
};