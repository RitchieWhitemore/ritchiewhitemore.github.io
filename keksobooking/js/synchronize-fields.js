'use strict';

(function () {
  window.synchronizeFields = function (elem1, elem2, arr1, arr2, onSyncHandler) {
    for (var i = 0; i < arr1.length; i++) {
      if (elem1.value === arr1[i]) {
        onSyncHandler(elem2, arr2[i]);
      }
    }
  };
})();