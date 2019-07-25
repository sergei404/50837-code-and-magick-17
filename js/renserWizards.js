'use strict';
(function () {
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var wzrd = window.setup.querySelector('.setup-wizard');
  var firebool = window.setup.querySelector('.setup-fireball-wrap');

  wzrd.addEventListener('click', function () {
    var coat = window.setup.querySelector('.wizard-coat');
    coat.style.fill = window.shuffle(window.arr.coatColors)[0];
    window.setup.querySelector('[name="coat-color"]').value = coat.style.fill;
    var eyes = window.setup.querySelector('.wizard-eyes');
    eyes.style.fill = window.shuffle(window.arr.eyesColors)[0];
    window.setup.querySelector('[name="eyes-color"]').value = eyes.style.fill;
  });

  firebool.addEventListener('click', function () {
    firebool.querySelector('[name="fireball-color"]').value = window.shuffle(fireballColors)[0];
    firebool.style.backgroundColor = firebool.querySelector('[name="fireball-color"]').value;
  });
})();
