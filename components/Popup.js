export class Popup {
    constructor(popup) {
        this._popup = document.querySelector(popup);
    }

    open() {
       this._popup.classList.add("popup_is-opened");
       document.addEventListener("keydown", this._handleEscapeClose);
    }

    close() {
       this._popup.classList.remove("popup_is-opened");
       document.removeEventListener("keydown", this._handleEscapeClose);
    }

    _handleEscapeClose = (evt) => {
        if (evt.key === "Escape") {
    this.close();
     } 
    }

    setEventListeners() {
     const closeButton = this._popup.querySelector(".popup__close");

     closeButton.addEventListener("click", () => {
     this.close();
    });

    this._popup.addEventListener("mousedown", (evt) => {
    if (evt.target === this._popup) {
      this.close();
      }
     });
    }
}

class PopupWithForm extends Popup {
    constructor(popup, handleFormSubmit) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    }

    _getInputValues() {
        const inputs = this._form.querySelectorAll(".form__input");
    const values = {};

    inputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
    }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    }
    }
