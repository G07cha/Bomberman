'use strict';
const Movable = require('./base/movable');

const upgradeInterval = 30000; // 30 seconds

class Player extends Movable {
  /**
   * Init player instance
   * @param  {Number} x
   * @param  {Number} y
   */
  constructor(x, y) {
    super(x, y);
    this.type = 'player';
    this.totalBombs = 1;
    this.placedBombs = 0;
    this.currentSpeed = 0;

    setInterval(() => {
      this.totalBombs++;
    }, upgradeInterval);
  }

  /**
   * Setting bomb for player if he is not expired available bombs counts
   *
   * @return Boolean - false if timeout to set new bomb is not expired elsewise, true
   */
  setBomb(map) {
    return new Promise((resolve, reject) => {
      if(this.placedBombs < this.totalBombs) {
        this.placedBombs++;
        super.placeBomb(map, resolve);
      } else {
        reject('Unable to place bomb');
      }
    }).then((bomb) => {
      this.placedBombs--;
      return bomb;
    });
  }
}

module.exports = Player;
