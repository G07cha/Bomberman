'use strict';

const Bomb = require('../bomb')
const Entity = require('./entity');

const MAX_SPEED = 4;

class Movable extends Entity {
  constructor(x, y) {
    super(x, y, true);
    this.currentSpeed = 0;
  }

  /**
   * Changes entity's coordinates with specified direction if it possible
   * @param  {Array} map       Two dimension array where `null` is empty block
   * @param  {String} direction Character that corresponds to one of the
   * following keys: 'w', 'a', 's', 'd'
   * @return {Boolean} True if entity moved succesfuly, if not possible to
   * move entity for some reason will return false
   */
  move(map, direction) {
    if(this.currentSpeed >= MAX_SPEED) {
      return false;
    } else {
      this.currentSpeed++;
      setTimeout(() => {
        this.currentSpeed--;
      }, 1000);
    }
    var isMoved = false;
    var loc = this.location;

    switch(direction) {
      case 'a':
        if(loc.x > 0 && map[loc.x - 1][loc.y] === null) {
          loc.x--;
          isMoved = true;
        }
        break;
      case 'd':
        if(loc.x < map.length - 1 && map[loc.x + 1][loc.y] === null) {
          loc.x++;
          isMoved = true;
        }
        break;
      case 'w':
        if(loc.y > 0 && map[loc.x][loc.y - 1] === null) {
          loc.y--;
          isMoved = true;
        }
        break;
      case 's':
        if(loc.y < map[0].length - 1 && map[loc.x][loc.y + 1] === null) {
          loc.y++;
          isMoved = true;
        }
        break;
    }

    this.location = loc;

    return isMoved;
  }

  onDestroy(callback) {
    this.ondestroy = callback;
  }

  destroy() {
    if(this.ondestroy) {
      this.ondestroy();
    }
  }

  /**
   * Places bomb on given map and resolves on bomb timeout without any checks so
   * make sure that you've overriden this function
   * @param  {Map}
   * @param  {Function} Promise's resolve
   */
  placeBomb(map, resolve) {
    var bomb = new Bomb(this.x, this.y);

    map.placeBomb(bomb);
    setTimeout(() => {
      resolve(bomb);
    }, bomb.timeout);
  }
}

module.exports = Movable;
