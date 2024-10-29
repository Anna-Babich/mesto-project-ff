export function openModal (popup) {
    return popup.classList.add('popup_is-opened');
};


export function closeModal (popup) {
    return popup.classList.remove('popup_is-opened');
}

export function handleCloseModal (evt) {
    let openPopup = document.querySelector('.popup_is-opened');
    if(evt.target.classList.contains('popup__close')) {
        closeModal(openPopup);
    } else if (evt.target.classList.contains('popup')) {
        closeModal(openPopup);
    }
};

export function closeModalEcs (event) {
    let openPopup = document.querySelector('.popup_is-opened');
    if (event.key === "Escape") {
        closeModal(openPopup);
    }
};