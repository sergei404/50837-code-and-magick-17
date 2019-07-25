'use strict';

(function () {

  var userName = window.setup.querySelector('.setup-user-name');
  userName.addEventListener('invalid', function () {
    if (userName.validity.tooShort) {
      userName.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userName.validity.tooLong) {
      userName.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userName.validity.valueMissing) {
      userName.setCustomValidity('Обязательное поле');
    } else {
      userName.setCustomValidity('');
    }
  });

  userName.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 2) {
      target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else {
      target.setCustomValidity('');
    }
  });

  window.userName = userName;

})();
