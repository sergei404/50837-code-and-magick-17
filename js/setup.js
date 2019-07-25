'use strict';

(function () {
  var wizards = [];
  var wizardsLen = 4;
  var setup = document.querySelector('.setup');
  var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

  for (var i = 0; i < wizardsLen; i++) {
    wizards.push({
      name: window.shuffle(names)[i] + ' ' + window.shuffle(lastNames)[i],
      coatColor: window.shuffle(coatColors)[i],
      eyesColor: window.shuffle(eyesColors)[i]
    });
  }

  var similarListElement = setup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  function renderWizard(wiz) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wiz.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wiz.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wiz.eyesColor;

    return wizardElement;
  }

  var fragment = document.createDocumentFragment();

  for (var j = 0; j < wizards.length; j++) {
    fragment.appendChild(renderWizard(wizards[j]));
  }
  similarListElement.appendChild(fragment);

  setup.querySelector('.setup-similar').classList.remove('hidden');

  window.arr = {
    coatColors: coatColors,
    eyesColors: eyesColors,
  };
})();
