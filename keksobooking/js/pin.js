'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');

  var renderMapPin = function (pin, id) {
    var mapPinElementTemplate = document.querySelector('template').content.querySelector('.map__pin');
    var mapPinElement = mapPinElementTemplate.cloneNode(true);

    mapPinElement.id = id;

    var pinImg = mapPinElement.firstChild;

    mapPinElement.style.left = pin.location.x - pinImg.width / 2 + 'px';
    mapPinElement.style.top = pin.location.y - pinImg.height / 2 + 'px';

    pinImg.setAttribute('src', pin.author.avatar);

    mapPinElement.addEventListener('click', window.map.pinActive);

    return mapPinElement;
  };

  window.pin = {
    showPins: function (ads) {
      var fragment = document.createDocumentFragment();

      ads.slice(0, 5).forEach(function (element, index) {
        fragment.appendChild(renderMapPin(element, index));
      });

      mapPins.appendChild(fragment);
    }
  };
})();