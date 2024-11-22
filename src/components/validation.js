function showInputError(
    formElement, 
    inputElement, 
    errorMessage,
    inputErrorClass,
    errorClass
) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
};

function hideInputError(
    formElement, 
    inputElement,
    inputErrorClass,
    errorClass
) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
    inputElement.setCustomValidity('');
};

const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
    if(inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
      hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
};
  

function setEventListener(
    formElement,
    inputSelector, 
    inputErrorClass,
    errorClass,
    submitButtonSelector,
    inactiveButtonClass
) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, inputErrorClass, errorClass);
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        })
    })
}

export function enableValidation (validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
        setEventListener(
            formElement, 
            validationConfig.inputSelector, 
            validationConfig.inputErrorClass, 
            validationConfig.errorClass, 
            validationConfig.submitButtonSelector, 
            validationConfig.inactiveButtonClass
        );
    });
}


function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

function toggleButtonState (inputList, buttonElement, inactiveButtonClass) {
    if(hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
}


export function clearValidation(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    inputList.forEach((inputElement) => { 
        inputElement.classList.remove(validationConfig.inputErrorClass);
        toggleButtonState (inputList, buttonElement, validationConfig.inactiveButtonClass);
        hideInputError(formElement, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
    })
};