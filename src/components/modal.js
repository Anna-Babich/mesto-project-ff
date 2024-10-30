export function openModal (popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('keydown', closeModalEcs);
};

export function closeModal (popup) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('keydown', closeModalEcs);
}

export function handleCloseModal (evt) {
    const openPopup = document.querySelector('.popup_is-opened');
    if(evt.target.classList.contains('popup__close')) {
        closeModal(openPopup);
    } else if (evt.target.classList.contains('popup')) {
        closeModal(openPopup);
    }
};

export function closeModalEcs (event) {
    if (event.key === "Escape") {
        const openPopup = document.querySelector('.popup_is-opened');
        closeModal(openPopup);
    }
};