export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners = () => {
    const inputList = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );
    const buttonElement = this._form.querySelector(
      this._config.submitButtonSelector
    );
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  resetErrors = () => {
    const button = this._form.querySelector(".form__save");
    button.classList.add("form__save_inactive");
    button.setAttribute("disabled", "disabled");

    const inputElements = this._form.querySelectorAll(".info_error");
    inputElements.forEach((element) => {
      element.classList.remove("info_error");
    });

    const errorElements = this._form.querySelectorAll(".info-error_active");
    errorElements.forEach((element) => {
      element.classList.remove("info-error_active");
      element.textContent = "";
    });
  };

  _toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add(this._config.inactiveButtonClass);
      buttonElement.setAttribute("disabled", "disabled");
    } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(this._config.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  };

  enableValidation = () => {
    const formList = Array.from(
      document.querySelectorAll(this._config.formSelector)
    );
    formList.forEach(() => {
      const fieldsetList = Array.from(
        this._form.querySelectorAll(this._config.fieldsetSelector)
      );
      fieldsetList.forEach((fieldset) => {
        this._setEventListeners(fieldset);
      });
    });
  };
}
