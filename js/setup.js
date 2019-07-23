'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var userName = setup.querySelector('.setup-user-name');
var wzrd = setup.querySelector('.setup-wizard');
var firebool = setup.querySelector('.setup-fireball-wrap');

wzrd.addEventListener('click', function () {
  var coat = setup.querySelector('.wizard-coat');
  coat.style.fill = shuffle(coatColors)[0];
  setup.querySelector('[name="coat-color"]').value = coat.style.fill;
  var eyes = setup.querySelector('.wizard-eyes');
  eyes.style.fill = shuffle(eyesColors)[0];
  setup.querySelector('[name="eyes-color"]').value = eyes.style.fill;
});

firebool.addEventListener('click', function () {
  firebool.querySelector('[name="fireball-color"]').value = shuffle(fireballColors)[0];
  firebool.style.backgroundColor = firebool.querySelector('[name="fireball-color"]').value;
});

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


var onPopupEscPress = function (evt) {
  if (document.activeElement !== userName && evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};


var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);

};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  setup.style.top = '';
  setup.style.left = '';
  artifact.style.position = 'static';
  artifact.style.zIndex = 3;
};


setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});


setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var wizards = [];
var wizardsLen = 4;
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];


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

// перетаскивание
var dialogHandler = setup.querySelector('.upload');

dialogHandler.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    setup.style.top = (setup.offsetTop - shift.y) + 'px';
    setup.style.left = (setup.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (ev) {
        ev.preventDefault();
        dialogHandler.removeEventListener('click', onClickPreventDefault);
      };
      dialogHandler.addEventListener('click', onClickPreventDefault);
    }

  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

var shop = document.querySelector('.setup-artifacts-shop');
var artifact = document.querySelector('.setup-artifacts');

var draggedItem = null;
shop.addEventListener('dragstart', function (evt) {
  if (evt.target.tagName.toLowerCase() === 'img') {
    draggedItem = evt.target;
    evt.dataTransfer.setData('text', evt.target.alt);
  }
  return false;
});

artifact.addEventListener('drop', function (evt) {
  evt.target.appendChild(draggedItem);
  return false;
});
artifact.addEventListener('dragenter', function (evt) {
  evt.preventDefault();
});
artifact.addEventListener('dragover', function (evt) {
  evt.preventDefault();
  return false;
});
artifact.addEventListener('dragleave', function (evt) {
  evt.preventDefault();
});


// function dragStart(ev) {
//   ev.dataTransfer.effectAllowed='move';
//   ev.dataTransfer.setData("text", ev.target.alt);
//   ev.dataTransfer.setDragImage(ev.target,15,15);
//   return true;
// }

// function dragEnter(ev) {
//   ev.preventDefault();
//   return true;
// }
// function dragOver(ev) {
//    ev.preventDefault();
// }

// function dragDrop(ev) {
//   var data = ev.dataTransfer.getData("text");
//   ev.target.appendChild(document.querySelector(data));
//   ev.stopPropagation();
//   return false;
// }
