'use strict';

(function () {
  var resizeValue = document.querySelector('.upload-resize-controls-value');
  var STEP = 25;

  window.initializeScale = function (scaleElement, adjustScale) {
    var val = parseInt(resizeValue.value);

    if (scaleElement.id === 'button-inc') {
      if (parseInt(resizeValue.value) <= 75) {
        val += STEP;
        resizeValue.value = val + '%';
      } else {
        val = 100;
        resizeValue.value = val + '%';
      }
    } else if (scaleElement.id === 'button-dec') {
      if (parseInt(resizeValue.value) >= 50) {
        val -= STEP;
        resizeValue.value = val + '%';
      } else {
        val = 25;
        resizeValue.value = val + '%';
      };
    };
    adjustScale(val);
  };
})();