'use strict';

(function () {
  var TITLE = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var TYPE = ['flat', 'house', 'bungalo'];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];


  var getRandomNumber = function (min, max) {

    return Math.floor(Math.random() * (max - min) + min);
  };

  var getFeatures = function (features) {
    var arr = [];

    var length = getRandomNumber(1, 6);

    for (var i = 0; i < length; i++) {
      arr[i] = features[getRandomNumber(1, 6)];
    }

    return arr;
  };

  var onLoad = function (ads) {
    window.data.adsArr = ads;
  };

  var onError = function (errorMessage) {

    var errorDiv = document.createElement('div');
    errorDiv.classList.add('error-message');
    errorDiv.textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', errorDiv);

    setTimeout(function () {
      document.body.removeChild(errorDiv);
    }, 5000);
  };

  window.backend.download(onLoad, onError)

  window.data = {
    adsArr:  [],
    filteredArr: [],
    getType: function (type) {
      if (type === 'flat') {
        return 'Квартира';
      } else if (type === 'bungalo') {
        return 'Бунгало';
      } else {
        return 'Дом';
      }
    }
  };
})();


