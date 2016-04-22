var host = location.origin.replace(/^http/, 'ws');
var ws = new WebSocket(host);

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var map = [];
var cellSize = 10;

ws.onmessage = function(event) {
  router(JSON.parse(event.data));
}

function update(diff) {
  diff.forEach(function(item) {
    setFillStyle(item.second);
    ctx.fillRect(item.x * cellSize, item.y * cellSize, cellSize, cellSize);
  });
}

function setFillStyle(item) {
  if(item) {
    switch (item.type) {
      case 'crate': ctx.fillStyle = '#84695a'; break;
      case 'block': ctx.fillStyle = '#999797'; break;
      case 'player': ctx.fillStyle = '#4277ff'; break;
      case 'bot': ctx.fillStyle = '#ff0000'; break;
      case 'bomb': ctx.fillStyle = '#ffe100'; break;
      default: ctx.fillStyle = '#000000'; break;
    }
  } else {
    ctx.fillStyle = '#FFFFFF';
  }
}
/**
 * Draw whole map in cavas(for setup use only)
 */
function draw() {
  for(var i = 0; i < map.length; i++) {
    for(var j = 0; j < map[i].length; j++) {
      setFillStyle(map[i][j]);
      ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
    }
  }
}

document.onkeypress = function(event) {
  event = event || window.event;

  var charCode = event.keyCode || event.which;
  var charStr = String.fromCharCode(charCode);

  var data = {
    type: 'keypress',
    key: charStr
  }
  ws.send(JSON.stringify(data));
}

/**
 * Choose correct handler for data
 */
function router(data) {
  if(!data) {
    return;
  }

  if(data.map) { // Initial message
    map = data.map;
    draw();
  } else if(data.type === 'update') {
    update(data.content);
  } else if(data.type === 'gameover') {
    if(data.result) {
      alert('You win');
    } else {
      alert('You lose');
    }
    window.location.reload();
  }
}
