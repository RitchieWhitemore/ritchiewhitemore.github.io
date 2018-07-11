'use strict';

(function () {
 // var pictures = window.data.getPictures();
  var renderPicture = function (picture) {
    var pictireElementTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
    var pictureElement = pictireElementTemplate.cloneNode(true);

    pictureElement.querySelector('img').setAttribute('src', picture.url);
    pictureElement.querySelector('.picture-likes').textContent = picture.likes;
    pictureElement.querySelector('.picture-comments').textContent = picture.comments.length;

    return pictureElement;
  }

  var onRenderPictures = function (data) {
    var fragment = document.createDocumentFragment();

    data.forEach(function (element) {
      fragment.appendChild(renderPicture(element));
    });

    var picturesElement = document.querySelector('.pictures');
    picturesElement.appendChild(fragment);

    var picturesElements = document.querySelectorAll('.picture');

    picturesElements.forEach(function (element) {
      element.addEventListener('click', window.gallery.openGalleryPopup);
    })

    var galleryCloseButton = document.body.querySelector('.gallery-overlay-close');

    galleryCloseButton.addEventListener('click', window.gallery.closeGalleryPopup);
  };

  var updatePicture = function (target) {
    var pictures = document.querySelector('.pictures');
    var delPictures = pictures.querySelectorAll('.picture');

    delPictures.forEach(function (element) {
      pictures.removeChild(element);
    });

    var arrOriginal = window.data.arrOriginal;
    var arrSort = [];

    switch (target.value) {
      case 'recommend':
        arrSort = arrOriginal;
        break;
      case 'popular':
        arrSort = arrOriginal.slice().sort(function (a, b) {
          var result = b.likes - a.likes;

          if (result === 0) {
            result = b.comments.length - a.comments.length;
          }
          return result;
        });
        break;
      case 'discussed':
        arrSort = arrOriginal.slice().sort(function (a, b) {
          var result = b.comments.length - a.comments.length;

          if (result === 0) {
            result = b.likes - a.likes;
          }
          return result;
        });
        break;
      case 'random':
        arrSort = arrOriginal.slice().sort(function (a, b) {
          return Math.random() - 0.5;
        });
        break;
    }

    onRenderPictures(arrSort);

  };

  var prevTimer;

  var onUpdate = function (evt) {
    clearTimeout(prevTimer);

    prevTimer = setTimeout(function () {
      updatePicture(evt.target);
    }, 500);

  }

  var onLoad = function (data) {

    window.data.arrOriginal = data;

    onRenderPictures(window.data.arrOriginal);

    var filtersFormElement = document.querySelector('.filters');
    filtersFormElement.classList.remove('hidden');

    var filtersRadio = filtersFormElement.querySelectorAll('.filters-radio');
    filtersRadio.forEach(function (element) {
      element.addEventListener('click', onUpdate);
    });
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.download(onLoad, onError);

})()
