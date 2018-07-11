'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var notice = document.querySelector('.notice');
  var form = notice.querySelector('.ad-form');
  var fildsets = notice.querySelectorAll('fieldset');
  var formAddress = notice.querySelector('#address');

  var map = document.querySelector('.map');

  var mapPinMain = map.querySelector('.map__pin--main');
  var imgPinElementSize = mapPinMain.querySelector('img').getBoundingClientRect();
  var mapPins = document.querySelector('.map__pins');


  var mainPinActive = function () {
    map.classList.remove('map--faded');

    window.pin.showPins(window.data.adsArr);
    window.showCard.showCard(window.data.adsArr[1]);

    form.classList.remove('ad-form--disabled');

    fildsets.forEach(function (element) {
      element.removeAttribute('disabled');
    });

  };

  mapPinMain.addEventListener('click', mainPinActive);

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinCoords = {
        x: (mapPinMain.offsetLeft - shift.x) + imgPinElementSize.width / 2,
        y: (mapPinMain.offsetTop - shift.y) + imgPinElementSize.height
      };

      if (pinCoords.y > 100 && pinCoords.y < 500) {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      };

      if (pinCoords.x > (mapPins.clientLeft + imgPinElementSize.width / 2) &&
          pinCoords.x < (mapPins.clientLeft + mapPins.clientWidth - imgPinElementSize.width / 2)) {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }

      formAddress.value = 'x: ' + pinCoords.x + ' y: ' + pinCoords.y;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    ads: window.data.getAds,
    pinActive: function (evt) {
      var mapPin = evt.currentTarget;
      mapPin.classList.add('map__pin--active');
      window.map.setMapPinsNonActive();

      var popup = map.querySelector('.popup');
      popup.style.display = 'block';

      var arr = [];
      if (window.data.filteredArr.length === 0) {
        arr = window.data.adsArr;
      } else {
        arr = window.data.filteredArr;
      }
      window.showCard.renderMapCard(arr[mapPin.id].offer, arr[mapPin.id], popup);

    },
    setMapPinsNonActive: function () {
      var mapPinElements = mapPins.querySelectorAll('.map__pin');
      mapPinElements.forEach(function (element) {
        element.classList.remove('map__pin--active');
      });
    }
  };

})();
