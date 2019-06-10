'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var HEIGHT = 150;
var WIDTH = 40;
var COLUMN = 50;
var STEP = WIDTH + COLUMN;
var YOU_COLOR = 'rgba(0, 0, 255, 1)';
var FONT = '16px PT Mono';
var COLOR = 'black';
var VICTORI = 'Ура вы победили!';
var RESULT = 'Список результатов:';


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};


window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = FONT;
  ctx.fillStyle = COLOR;
  ctx.fillText(VICTORI, HEIGHT, WIDTH - GAP);
  ctx.fillText(RESULT, HEIGHT, COLUMN);

  var max = 0;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    var name = names[i];
    max = time > max ? time : max;
  }

  var stepY = HEIGHT / max;

  for (i = 0; i < times.length; i++) {
    time = times[i];
    name = names[i];

    var height = stepY * time;

    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillText(time.toFixed(), STEP * i + HEIGHT, STEP + HEIGHT - height - 10);
    ctx.fillText(name, STEP * i + HEIGHT, STEP + HEIGHT + FONT_GAP);


    var otherColor = 'rgba(0, 0, 255,' + Math.random().toFixed(1) +')';

    var columnColor;

    if (name === 'Вы') {
       columnColor = YOU_COLOR;
    } else {
      columnColor = otherColor;
    }

    ctx.fillStyle = columnColor;
    ctx.fillRect(STEP * i + HEIGHT, STEP + HEIGHT - height, WIDTH, height);
  }
};
