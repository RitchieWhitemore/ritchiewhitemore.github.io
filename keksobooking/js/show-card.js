'use strict';

(function () {
  window.showCard = {
    showCard: function (ads) {
      var mapPins = document.querySelector('.map__pins');
      var fragment = document.createDocumentFragment();

      var mapCardElementTemplate = document.querySelector('template').content.querySelector('.map__card');
      var mapCardElement = mapCardElementTemplate.cloneNode(true);
      mapCardElement.style.display = 'none';
      fragment.appendChild(window.showCard.renderMapCard(ads.offer, ads, mapCardElement));

      mapPins.appendChild(fragment);
    },
    renderMapCard: function (offer, arr, mapCardElement) {
      mapCardElement.querySelector('.popup__title').textContent = offer.title;
      mapCardElement.querySelector('.popup__text--address').textContent = arr.location.x + ' и ' + arr.location.y;
      mapCardElement.querySelector('.popup__text--price').innerHTML = offer.price + '&#x20bd;<span>/ночь</span>';
      mapCardElement.querySelector('.popup__type').textContent = window.data.getType(offer.type);
      mapCardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
      mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ' выезд до ' + offer.checkout;

      var featuresList = mapCardElement.querySelector('.popup__features');
      featuresList.textContent = '';

      offer.features.forEach(function (element) {
        featuresList.insertAdjacentHTML('beforeEnd', '<li class="popup__feature popup__feature--' + element + '"></li>');
      })

      mapCardElement.querySelector('.popup__description').textContent = offer.description;
      mapCardElement.querySelector('.popup__avatar').setAttribute('src', arr.author.avatar);

      var popupCloseButton = mapCardElement.querySelector('.popup__close');

      var popupClose = function () {
        mapCardElement.style.display = 'none';
        window.map.setMapPinsNonActive();
      };

      var onPopupClosePressEsc = function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          popupClose();
        }
      }

      popupCloseButton.addEventListener('click', popupClose);
      document.addEventListener('keydown', onPopupClosePressEsc);

      return mapCardElement;
    },
  };
})();