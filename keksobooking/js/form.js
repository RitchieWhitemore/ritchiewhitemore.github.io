'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var map = document.querySelector('.map');

  var notice = document.querySelector('.notice');
  var form = document.querySelector('.ad-form');
  var formButtonSubmit = form.querySelector('.ad-form__submit');
  var formInputs = notice.querySelectorAll('input');

  var formRoomNumber = notice.querySelector('#room_number');
  var formCapacity = notice.querySelector('#capacity');


  var guestCount = function (target, guest) {

    switch (target.options[target.selectedIndex].innerText) {
      case '1 комната' :
        guest.selectedIndex = 2;
        for (var i = 0; i < guest.options.length; i++) {
          if (i != 2) {
            guest.options[i].disabled = true;
          } else {
            guest.options[i].disabled = false;
          };
        }
        break;
      case '2 комнаты' :
        guest.selectedIndex = 1;
        for (var i = 0; i < guest.options.length; i++) {
          if (i != 2 && i != 1) {
            guest.options[i].disabled = true;
          } else {
            guest.options[i].disabled = false;
          };
        }
        break;
      case '3 комнаты' :
        guest.selectedIndex = 0;
        for (var i = 0; i < guest.options.length; i++) {
          if (i != 2 && i != 1 && i != 0) {
            guest.options[i].disabled = true;
          } else {
            guest.options[i].disabled = false;
          };
        }
        break;
      case '100 комнат' :
        guest.selectedIndex = 3;
        for (var i = 0; i < guest.options.length; i++) {
          if (i != 3) {
            guest.options[i].disabled = true;
          } else {
            guest.options[i].disabled = false;
          };
        }
        break;
    }

  };

  guestCount(formRoomNumber, formCapacity);

  formButtonSubmit.addEventListener('click', function (evt) {

    evt.preventDefault();

    var errorMessage;
    var errorField;

    var validity = function () {
      var valid = true;
      for (var i = 0; i < formInputs.length; i++) {
        if (!formInputs[i].validity.valid) {
          formInputs[i].style.borderColor = 'red';
          valid = false;
          errorField = formInputs[i].previousElementSibling.textContent;
          errorMessage = formInputs[i].validationMessage;
          return valid;
        }
      }

      return valid;
    }

    var onLoad = function () {
      var successDiv = document.createElement('div');
      successDiv.classList.add('success-message');
      successDiv.textContent = 'Данные успешно отправленны!';

      document.body.insertAdjacentElement('afterbegin', successDiv);

      setTimeout(function () {
        document.body.removeChild(successDiv);
      }, 5000);

      form.reset();
    };

    var onError = function (errorMessage, errorField) {

      var errorDiv = document.createElement('div');
      errorDiv.classList.add('error-message');
      errorDiv.textContent = errorMessage + ' поле ' + errorField;

      document.body.insertAdjacentElement('afterbegin', errorDiv);

      setTimeout(function () {
        document.body.removeChild(errorDiv);
      }, 5000);
    };

    if (validity()) {
      window.backend.upload(new FormData(form), onLoad, onError);
    } else {
      onError(errorMessage, errorField);
    }
  });

  formRoomNumber.addEventListener('change', function (evt) {
    var target = evt.target;
    guestCount(target, formCapacity);
  });

  var formType = notice.querySelector('#type');
  var formPrice = notice.querySelector('#price');

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  formType.addEventListener('change', function () {
    window.synchronizeFields(formType, formPrice, ['flat', 'bungalo', 'palace', 'house'], [1000, 0, 5000, 10000], syncValueWithMin);
  });

  var timeIn = notice.querySelector('#timein');
  var timeOut = notice.querySelector('#timeout');

  var syncValues = function (element, value) {
    element.value = value;
  }

  var changeTime = function (evt) {
    var target = evt.target;

    if (target.id === 'timein') {
      window.synchronizeFields(target, timeOut, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
    }

    if (target.id === 'timeout') {
      window.synchronizeFields(target, timeIn, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
    }

  };

  timeIn.addEventListener('change', changeTime);
  timeOut.addEventListener('change', changeTime);

  var buttonSave = document.querySelector('.ad-form__submit');

  buttonSave.addEventListener('click', function (evt) {

  })


})();
