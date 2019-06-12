'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
var wizards = [];
var wizardsLen = 4;
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var rand = Math.floor(Math.random() * (i + 1));
    var temp = arr[rand];
    arr[rand] = arr[i];
    arr[i] = temp;
  }
  return arr;
}


for (var i = 0; i < wizardsLen; i++) {
  wizards.push({
    name: shuffle(names)[i] + ' ' + shuffle(lastNames)[i],
    coatColor: shuffle(coatColors)[i],
    eyesColor: shuffle(eyesColors)[i]
  });
}

var similarListElement = userDialog.querySelector('.setup-similar-list');
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

for (var j = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[j]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
