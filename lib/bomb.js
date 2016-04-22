'use strict';

const Entity = require('./base/entity');

class Bomb extends Entity {
  constructor(x, y) {
    super(x, y, true);
    this.type = 'bomb';
    this.timeout = 3000; // 3 seconds
  }

  /**
   * Remove items from map if they destroyable and emits destroy middleware if presented
   * @param  {Array} Two dimension array
   * @return {Array} New map
   */
  destroyArea(map) {
    for(var i = -1; i <= 1; i++) {
      var x = this.x + i,
          y = this.y + i;
      // Vertical check
      if(x >= 0 && x < map.length && this.checkItem(map[x][this.y])) {
        if(map[x][this.y].destroy) {
          map[x][this.y].destroy();
        }
        map[x][this.y] = null;
      }
      // Horisontal check
      if(y >= 0 && y < map[this.x].length && this.checkItem(map[this.x][y])) {
        if(map[this.x][y].destroy) {
          map[this.x][y].destroy();
        }
        map[this.x][y] = null;
      }
    }

    return map;
  }

  /**
   * Check is given item is not empty and destroyable
   * @param  {Object} item Cell in map
   * @return {Boolean} true if item exists and destroyable
   */
  checkItem(item) {
    if(item !== null && item.isDestroyable) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Bomb
