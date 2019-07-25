'use strict';
(function () {
  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var rand = Math.floor(Math.random() * (i + 1));
      var temp = arr[rand];
      arr[rand] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  window.shuffle = shuffle;

})();
