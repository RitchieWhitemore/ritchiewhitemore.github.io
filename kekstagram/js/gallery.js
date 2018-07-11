'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var gallery = document.querySelector('.gallery-overlay');

  window.gallery = {
    openGalleryPopup: function (evt) {
      var currentTarget = evt.currentTarget;
      evt.preventDefault();
      gallery.classList.remove('hidden');
      gallery.querySelector('.gallery-overlay-image').setAttribute('src', currentTarget.querySelector('img').getAttribute('src'));
      gallery.querySelector('.likes-count').textContent = currentTarget.querySelector('.picture-comments').textContent;
      gallery.querySelector('.comments-count').textContent = currentTarget.querySelector('.picture-likes').textContent;

      document.addEventListener('keydown', function () {
        if (evt.keyCode === ESC_KEYCODE) {
          window.gallery.closeGalleryPopup();
        }
      });
    },
    closeGalleryPopup: function () {
      gallery.classList.add('hidden');
    }
  };

})();