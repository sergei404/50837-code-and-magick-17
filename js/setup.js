'use strict';

(function () {
  var setup = document.querySelector('.setup');
  // var form = setup.querySelector('.setup-wizard-form');
  var similarListElement = setup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  function renderWizard(wiz) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wiz.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wiz.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wiz.colorEyes;

    return wizardElement;
  }

  window.load(function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.shuffle(wizards).slice(0, 4).length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    setup.querySelector('.setup-similar').classList.remove('hidden');

  });

  // form.addEventListener('submit', function (evt) {
  //   window.upload(new FormData(form), function (response) {
  //     console.log(response);
  //     setup.classList.add('hidden');
  //   });
  //   evt.preventDefault();
  // });

  // window.arr = {
  //   coatColors: coatColors,
  //   eyesColors: eyesColors,
  // };

})();
