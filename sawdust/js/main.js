'use strict';

const mainMenu = document.body.querySelector(`.main-menu`);

const mainMenuBtnToggle = document.body.querySelector(`.main-menu__toggle`);
const mainMenuBtnClose = document.body.querySelector(`.main-menu__btn-close`);

const backgroundPopup = document.body.querySelector(`.background-popup`);

const onShowMenu = () => {
  mainMenu.classList.toggle(`main-menu--closed`);
  mainMenu.classList.toggle(`popup`);
  backgroundPopup.classList.toggle(`background-popup--closed`);
};

if (mainMenuBtnToggle) {
  mainMenuBtnToggle.onclick = () => {
    onShowMenu();
  };
}

if (mainMenuBtnClose) {
  mainMenuBtnClose.onclick = () => {
    onShowMenu();
  };
}

//**************************************************

const contactBtn = document.body.querySelector(`.contacts__btn`);
const mainMenuCallback = document.body.querySelector(`.main-menu__item--callback`);
const mainHeaderBtnCallback = document.body.querySelector(`.main-header__bnt-callback`);
const goodsBtnBuy = document.body.querySelectorAll(`.goods__btn-buy`);

const orderForm = document.body.querySelector(`.order-form`);
const orderFormBtnClose = document.body.querySelector(`.order-form__btn-close`);

const onShowOrder = (mainMenuFlag) => {
  if (mainMenuFlag) {
    onShowMenu();
  }
  orderForm.classList.toggle(`order-form--closed`);

  backgroundPopup.classList.toggle(`background-popup--closed`);
  backgroundPopup.style.height = document.body.scrollHeight + `px`;
};

contactBtn.onclick = () => onShowOrder();
mainMenuCallback.onclick = () => onShowOrder(true);
mainHeaderBtnCallback.onclick = () => onShowOrder();

Array.from(goodsBtnBuy).forEach((it) => {
  it.onclick = () => onShowOrder();
});

orderFormBtnClose.onclick = () => onShowOrder();

//*****************************************************

const mainMenuLink = document.body.querySelectorAll(`.main-menu__link`);
const mainHeader = document.body.querySelector(`.main-header`);

const HEADER_HEIGHT = mainHeader.getBoundingClientRect().height;

Array.from(mainMenuLink).forEach((it) => {
  it.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    const target = evt.currentTarget;

    const element = document.querySelector(`${target.hash}`);
    window.location.hash = target.hash;

    let scroll = element.offsetTop - HEADER_HEIGHT;

    if (window.innerWidth < 1200) {
      scroll = element.offsetTop;
      onShowMenu();
    }

    window.scrollTo(0, scroll);
  })
});

if (window.innerWidth >= 1200) {
  window.onhashchange = (evt) => {

    Array.from(mainMenuLink).forEach((it) => {
      if (it.hash === window.location.hash) {
        it.parentElement.classList.add(`main-menu__item--active`);
      } else {
        it.parentElement.classList.remove(`main-menu__item--active`);
      }
    });
  };
}
const goods = document.querySelector(`.goods`);
const delivery = document.querySelector(`.delivery`);
const contacts = document.querySelector(`.contacts`);

document.onscroll = () => {


  if (goods.getBoundingClientRect().top <= 200) {
    Array.from(mainMenuLink).forEach((it) => {
      if (it.id === `follow-goods`) {
        it.parentElement.classList.add(`main-menu__item--active`);
      } else {
        it.parentElement.classList.remove(`main-menu__item--active`);
      }
    });
  } else {
    Array.from(mainMenuLink).forEach((it) => {
      it.parentElement.classList.remove(`main-menu__item--active`);
    });
  }

  if (delivery.getBoundingClientRect().top <= 200) {
    Array.from(mainMenuLink).forEach((it) => {
      if (it.id === `follow-delivery`) {
        it.parentElement.classList.add(`main-menu__item--active`);
      } else {
        it.parentElement.classList.remove(`main-menu__item--active`);
      }
    });
  }

  if (contacts.getBoundingClientRect().top <= 300) {
    Array.from(mainMenuLink).forEach((it) => {
      if (it.id === `follow-contacts`) {
        it.parentElement.classList.add(`main-menu__item--active`);
      } else {
        it.parentElement.classList.remove(`main-menu__item--active`);
      }
    });
  }
};

//********************************************************

const orderFormBtnSubmit = document.querySelector(`.order-form__btn-submit`);
const formOrder = document.querySelector(`.order-form__form`);

const formInputs = document.forms[0].querySelectorAll('input');

Array.from(formInputs).forEach((it) => {
  it.oninput = (evt) => {
    evt.currentTarget.nextElementSibling.style.display = `none`;
  }
});

window.backend = {
  upload: function (data, onLoad) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('POST', `/modules/mail.php`);

    xhr.addEventListener('load', function () {
      onLoad();
    });
    xhr.send(data);

  }
};

class CustomValidation {

  constructor() {
    this.invalidities = [];
  }

  checkValidity(input) {

    const validity = input.validity;

    if (validity.patternMismatch) {
      this.addInvalidity('This is the wrong pattern for this field');
    }

    if (validity.rangeOverflow) {
      const max = getAttributeValue(input, 'max');
      this.addInvalidity('The maximum value should be ' + max);
    }

    if (validity.rangeUnderflow) {
      const min = getAttributeValue(input, 'min');
      this.addInvalidity('The minimum value should be ' + min);
    }

    if (validity.stepMismatch) {
      const step = getAttributeValue(input, 'step');
      this.addInvalidity('This number needs to be a multiple of ' + step);
    }

    if (input.value === ``) {
      this.addInvalidity('Заполните поле');
    }

  }

  addInvalidity(message) {
    this.invalidities.push(message);
  }

  get Invalidities() {
    return this.invalidities.join('. \n');
  }
}

orderFormBtnSubmit.onclick = (evt) => {
  evt.preventDefault();

  const validity = function () {
    let valid = true;
    for (let i = 0; i < formInputs.length; i++) {

      const input = formInputs[i];

      if (input.checkValidity() == false) {
        valid = false;
        const inputCustomValidation = new CustomValidation();
        inputCustomValidation.checkValidity(input);
        const customValidityMessage = inputCustomValidation.Invalidities;

        input.nextElementSibling.textContent = customValidityMessage;
        input.nextElementSibling.style.display = `block`;

      }
    }
    return valid;
  };

  const onLoad = () => {
    onShowOrder();

    const div = document.createElement(`div`);
    div.className = `alert alert--success`;
    div.innerHTML = `Сообщение отправленно`;

    document.body.appendChild(div);

    setTimeout(() => {
      document.body.removeChild(div);
    }, 3000);
  };

  if (validity()) {
    window.backend.upload(new FormData(formOrder), onLoad);
  }
};