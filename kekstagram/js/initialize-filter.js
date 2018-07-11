'use strict';

(function () {
  var DEFAULT_EFFECT_VALUE = 20;

  var effectImg = document.querySelector('.upload-form-preview img');
  var imagePreview = document.querySelector('.effect-image-preview');

  var uploadEffects = document.querySelector('.upload-effect-controls');
  var effectLevel = uploadEffects.querySelector('.upload-effect-level');

  var effectPin = document.querySelector('.upload-effect-level-pin');
  var lineValue = document.querySelector('.upload-effect-level-val');

  window.initializeFilter = function (filterElement, applyFilter) {
    if (filterElement.defaultValue === 'none') {
      effectImg.style.filter = '';
      imagePreview.className = '';
      effectLevel.style.visibility = 'hidden';
    } else {
      effectLevel.style.visibility = 'visible';
      effectImg.style.filter = '';
      applyFilter(filterElement.defaultValue, effectImg.className);
      effectPin.style.left = DEFAULT_EFFECT_VALUE + '%';
      lineValue.style.width = DEFAULT_EFFECT_VALUE + '%';
    }
  }
})()