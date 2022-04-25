export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._saveButton = this._form.querySelector(".form__save");
    this._inputList = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );
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
    this._toggleButtonState(this._inputList);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList);
      });
    });
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  resetErrors = () => {
    this._toggleButtonStateInactive();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    const errorElements = this._form.querySelectorAll(".info-error_active");
    errorElements.forEach((element) => {
      element.classList.remove("info-error_active");
      element.textContent = "";
    });
  };

  _toggleButtonStateInactive = () => {
    this._saveButton.classList.add(this._config.inactiveButtonClass);
    this._saveButton.setAttribute("disabled", "disabled");
  };

  _toggleButtonStateActive = () => {
    this._saveButton.classList.remove(this._config.inactiveButtonClass);
    this._saveButton.removeAttribute("disabled");
  };

  _toggleButtonState = (inputList) => {
    if (this._hasInvalidInput(inputList)) {
      this._toggleButtonStateInactive();
    } else {
      this._toggleButtonStateActive();
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
