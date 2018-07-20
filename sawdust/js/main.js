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


  if (goods.getBoundingClientRect().top <= 200 ) {
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