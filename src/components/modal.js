export function openModal (popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('keydown', closeModalEcs);
};

export function closeModal (popup, form) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('keydown', closeModalEcs);
    
    clearValidation(form);
};

export function clearValidation (formElement) {
    const inputErrorList = Array.from(formElement.querySelectorAll('.form__input-error'));
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => { 
        inputElement.classList.remove('form__input_type_error'); 
    })
    inputErrorList.forEach((span) => {
        span.textContent = '';
    })
    formElement.reset();
};

export function handleCloseModal (evt, form) {
    const openPopup = document.querySelector('.popup_is-opened');
    if(evt.target.classList.contains('popup__close')) {
        closeModal(openPopup, form);
    } else if (evt.target.classList.contains('popup')) {
        closeModal(openPopup, form);
    }
};

export function closeModalEcs (event) {
    if (event.key === "Escape") {
        const openPopup = document.querySelector('.popup_is-opened');
        closeModal(openPopup);
    }
};