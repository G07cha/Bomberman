const Bomb = require('../../bomb');

module.exports = {
  update: function(map) {
    if(isItemNear(this.x, this.y, map.current, 'bomb')
    || map.bombs.find((b) => b.x === this.x && b.y === this.y)) {
      moveToFreeCell.call(this, map);
    } else if(isItemNear(this.x, this.y, map.current, 'bot')
    || isItemNear(this.x, this.y, map.current, 'player')) {
      return this.placeBomb(map)
      .catch(() => {
        moveToFreeCell.call(this, map);
      });
    } else {
      moveToFreeCell.call(this, map);
    }
  }
};

function isItemNear(x, y, map, type) {
  var isNear = false;
  checkNearCells(map, x, y, function(x, y) {
    var elem = map[x][y];
    if(elem !== null && elem.type === type) {
      isNear = true;
    }
  });

  return isNear;
}

function moveToFreeCell(map) {
  var freeCells = [];

  checkNearCells(map.current, this.x, this.y, function(x, y) {
    if(map.current[x][y] === null) {
      freeCells.push({x: x, y: y});
    }
  });

  if(freeCells.length > 0) {
    var selectedCell = freeCells[Math.floor(Math.random() * freeCells.length)];
    var oldLocation = this.location;
    this.location = selectedCell;
    map.moveEntity(oldLocation, this);
  }
}

function checkNearCells(map, x, y, cb) {
  for(var i = -1; i <= 1; i += 2) {
    var local_x = x + i,
        local_y = y + i;

    if(local_x >= 0 && local_x < map.length) {
        cb(local_x, y);
    }
    if(local_y >= 0 && local_y < map[x].length) {
        cb(x, local_y);
    }
  }
}
