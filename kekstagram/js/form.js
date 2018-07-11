'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadCancelButton = document.querySelector('#upload-cancel');
  var uploadFormDescription = document.querySelector('.upload-form-description');

  uploadFile.addEventListener('change', function () {
    uploadOverlay.classList.remove('hidden');

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        if (evt.target !== uploadFormDescription) {
          uploadOverlay.classList.add('hidden');
        }
      }
    });
  });

  uploadCancelButton.addEventListener('click', function () {
    uploadOverlay.classList.add('hidden');
  });

  var resizeButtonDec = document.querySelector('.upload-resize-controls-button-dec');
  var resizeButtonInc = document.querySelector('.upload-resize-controls-button-inc');

  var imagePreview = document.querySelector('.effect-image-preview');
  var effectImg = document.querySelector('.upload-form-preview img');

  var adjustScale = function (val) {
    imagePreview.style.transform = 'scale(' + val / 100 + ')';
  }

  resizeButtonInc.addEventListener('click', function () {
    window.initializeScale(resizeButtonInc, adjustScale);
  });

  resizeButtonDec.addEventListener('click', function () {
    window.initializeScale(resizeButtonDec, adjustScale);
  })

  var uploadEffects = document.querySelector('.upload-effect-controls');
  var effectLevel = uploadEffects.querySelector('.upload-effect-level');

  var effectLine = document.querySelector('.upload-effect-level-line');
  var effectPin = document.querySelector('.upload-effect-level-pin');
  var lineValue = document.querySelector('.upload-effect-level-val');

  effectLevel.style.visibility = 'hidden';

  var applyFilter = function (newFilter, oldFilter) {
    if (oldFilter !== '') {
      effectImg.classList.remove(oldFilter);
    }
    effectImg.classList.add('effect-' + newFilter);
  };

  uploadEffects.addEventListener('click', function (evt) {
    var target = evt.target;

    if (target.localName === 'input') {
      window.initializeFilter(target, applyFilter);
    }
  });

  var getCoords = function (elem) {
    var box = elem.getBoundingClientRect();

    return {
      x: box.left,
      y: box.top
    }
  }

  effectPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

   var pinSliderCoords = getCoords(effectPin);
   var lineSliderCoords = getCoords(effectLine);



    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var coordsLine = effectLine.getBoundingClientRect();

      var coordXPx = moveEvt.pageX - lineSliderCoords.x;
      var lineWidth = effectLine.getBoundingClientRect().right - effectLine.getBoundingClientRect().left;

      var coordXProcent = Math.floor((coordXPx * 100) / lineWidth);

      if (moveEvt.clientX < lineSliderCoords.x) {
        coordXProcent = 0;
      }

      var rightEdge = lineSliderCoords.x + effectLine.getBoundingClientRect().width;

      if (moveEvt.clientX > rightEdge) {
        coordXProcent = 100;
      }

      effectPin.style.left = coordXProcent + '%';
      lineValue.style.width = coordXProcent + '%';

      switch (effectImg.className) {
        case 'effect-chrome' :
          effectImg.style.filter = 'grayscale(' + coordXProcent / 100 + ')';
          break;
        case 'effect-sepia' :
          effectImg.style.filter = 'sepia(' + coordXProcent / 100 + ')';
          break;
        case 'effect-marvin' :
          effectImg.style.filter = 'invert(' + coordXProcent + '%)';
          break;
        case 'effect-phobos' :
          effectImg.style.filter = 'blur(' + coordXProcent * 3 / 100 + 'px)';
          break;
        case 'effect-heat' :
          effectImg.style.filter = 'brightness(' + coordXProcent * 3 / 100 + ')';
          break;
        case '' :
          break;
      }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var formUpload = document.querySelector('#upload-select-image');

  var onLoad = function () {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: green;';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = 'Данные успешно загружены!';
    document.body.insertAdjacentElement('afterbegin', node);
  };

  formUpload.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(formUpload), onLoad);
    document.querySelector('.upload-overlay').classList.add('hidden');
  })

})();