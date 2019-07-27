'use strict';

(function () {
  var URL = 'https://js.dump.academy/code-and-magick/data';

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();

(function () {
  var URL = 'https://js.dump.academy/code-and-magick/data';
  window.onLoad = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('GET', URL);
    xhr.send();
  };
})();


// (function () {
//   var CALLBACK_NAME = '__jsonpCallback';
//   var DATA_URL = 'https://js.dump.academy/code-and-magick/data';


//   var loader = document.createElement('script');
//   loader.src = DATA_URL + '?callback=' + CALLBACK_NAME;
//   loader.addEventListener('error', function () {
//     document.body.textContent = 'Произошла ошибка при загрузке данных';
//   });
//   document.body.append(loader);

//   window.CALLBACK_NAME = CALLBACK_NAME;
// })();


// var CallbackRegistry = {}; // реестр

// // при успехе вызовет onSuccess, при ошибке onError
// function scriptRequest(url, onSuccess, onError) {

//   var scriptOk = false; // флаг, что вызов прошел успешно

//   // сгенерировать имя JSONP-функции для запроса
//   var CALLBACK_NAME = '__jsonpCallback';
//   var DATA_URL = 'https://js.dump.academy/code-and-magick/data';
//   // укажем это имя в URL запроса
//   // url += ~url.indexOf('?') ? '&' : '?';
//   // url += 'callback=CallbackRegistry.' + callbackName;

//   // ..и создадим саму функцию в реестре
//   CallbackRegistry[CALLBACK_NAME] = function(data) {
//     scriptOk = true; // обработчик вызвался, указать что всё ок
//     delete CallbackRegistry[CALLBACK_NAME]; // можно очистить реестр
//     onSuccess(data); // и вызвать onSuccess
//   };

//   // эта функция сработает при любом результате запроса
//   // важно: при успешном результате - всегда после JSONP-обработчика
//   function checkCallback() {
//     if (scriptOk) return; // сработал обработчик?
//     delete CallbackRegistry[CALLBACK_NAME];
//     onError(url); // нет - вызвать onError
//   }

//   var script = document.createElement('script');

// в старых IE поддерживается только событие, а не onload/onerror
// в теории 'readyState=loaded' означает "скрипт загрузился",
// а 'readyState=complete' -- "скрипт выполнился", но иногда
// почему-то случается только одно из них, поэтому проверяем оба
// script.onreadystatechange = function() {
//   if (this.readyState == 'complete' || this.readyState == 'loaded') {
//     this.onreadystatechange = null;
//     setTimeout(checkCallback, 0); // Вызвать checkCallback - после скрипта
//   }
// }

// события script.onload/onerror срабатывают всегда после выполнения скрипта
//   script.onload = script.onerror = checkCallback;
//   script.src = DATA_URL;

//   document.body.appendChild(script);
// }
