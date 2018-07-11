'use strict';

(function () {
  var removePins = function () {
    var pinList = document.querySelector('.map__pins');
    var pins = pinList.querySelectorAll('.map__pin');
    var pinMain = pinList.querySelector('.map__pin--main');

    pins.forEach(function (element) {
      if (element !== pinMain) {
        pinList.removeChild(element);
      }
    });
  };

  var mapFilters = document.querySelectorAll('.map__filter');
  var features = document.querySelector('.map__filters').querySelectorAll('.map__checkbox');

  var updatePins = function () {
    removePins();

    var filterMap = Array.from(mapFilters).map(function (element) {

      var obj = {};

      if (element.id === 'housing-price') {
        switch (element.selectedOptions['0'].value) {
          case 'low' :
            obj[element.id] = element.selectedOptions['0'].value;
            obj['minPrice'] = 0;
            obj['maxPrice'] = 10000;
            break;
          case 'middle' :
            obj[element.id] = element.selectedOptions['0'].value;
            obj['minPrice'] = 10000;
            obj['maxPrice'] = 50000;
            break;
          case 'high' :
            obj[element.id] = element.selectedOptions['0'].value;
            obj['minPrice'] = 50000;
            obj['maxPrice'] = 1000000;
            break;
          default:
            obj[element.id] = element.selectedOptions['0'].value;
            break;
        }
      } else {
        obj[element.id] = element.selectedOptions['0'].value;
      }
      return obj;
    });

    var featuresMap = Array.from(features).filter(function (element) {
      return element.checked;
    }).map(function (element) {
      return element.value;
    });

    window.data.filteredArr = window.data.adsArr.filter(function (element) {

      var filterBool = true;

      if (element.offer.type !== filterMap[0]['housing-type']) {
        if (filterMap[0]['housing-type'] === 'any') {
          filterBool = true;
        } else {
          return false;
        }
      }
      if (filterMap[1]['minPrice'] > element.offer.price || filterMap[1]['maxPrice'] < element.offer.price) {
        if (filterMap[1]['housing-price'] === 'any') {
          filterBool = true;
        } else {
          return false;
        }
      }
      if (element.offer.rooms !== parseInt(filterMap[2]['housing-rooms'])) {
        if (filterMap[2]['housing-rooms'] === 'any') {
          filterBool = true;
        } else {
          return false;
        }
      }
      if (element.offer.guests !== parseInt(filterMap[3]['housing-guests'])) {
        if (filterMap[3]['housing-guests'] === 'any') {
          filterBool = true;
        } else {
          return false;
        }
      }

      for (var i = 0; i < featuresMap.length; i++) {
        if (element.offer.features.indexOf(featuresMap[i]) !== -1) {
          filterBool = true;
        } else {
          return false;
        }
      }
      return filterBool;
    });

    window.pin.showPins(window.data.filteredArr);
  };

  var prevTimer;

  mapFilters.forEach(function (element) {
    element.addEventListener('change', function () {
      clearTimeout(prevTimer);
      prevTimer = setTimeout(function () {
        updatePins();
      }, 1000);
    });
  });

  features.forEach(function (element) {
    element.addEventListener('change', function () {
      clearTimeout(prevTimer);
      prevTimer = setTimeout(function () {
        updatePins();
      }, 1000);
    });
  });
})()