'use strict';

(function () {
  var shop = window.setup.querySelector('.setup-artifacts-shop');
  var artifact = window.setup.querySelector('.setup-artifacts');

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

})();
