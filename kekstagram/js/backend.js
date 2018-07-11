'use strict';

(function () {
  var URLDownload = 'https://js.dump.academy/kekstagram/data';
  var URLUpload = 'https://js.dump.academy/kekstagram';
  window.backend = {
    download: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.open('GET', URLDownload);

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Неизвестный статус ошибки ' + xhr.status);
        }
      });
      
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.send();
    },
    upload: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.open('POST', URLUpload);

      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });

      xhr.send(data);
    }
  };
})();