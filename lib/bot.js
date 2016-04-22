'use strict';

const Bomb = require('./bomb')
const Movable = require('./base/movable');

class Bot extends Movable {
  constructor(x, y, strategy) {
    super(x, y);
    this.type = 'bot';
    this.strategy = require(`./strategies/ai/${strategy}`);
    this.isBombPlaced = false;
  }

  placeBomb(map) {
    return new Promise((resolve, reject) => {
      if(this.isBombPlaced) {
        reject('Unable to place bomb');
      } else {
        this.isBombPlaced = true;
        super.placeBomb(map, resolve);
      }
    }).then((bomb) => {
      this.isBombPlaced = false;
      map.detonateBomb(bomb);
    });
  }

  update(map) {
    if(this.strategy.update) {
      return this.strategy.update.call(this, map);
    } else {
      console.error('Strategy for bot isn\'t set, skipping');
    }
  }
}

module.exports = Bot;
