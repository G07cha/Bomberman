'use strict';
const Block = require('./block');
const Bot = require('./bot');

const width = 11,
      height = 13;

class Map {
  constructor() {
    this.bombs = [];
    this.map = [];

    // Initializing empty map
    for(var i = height; i > 0; i--) {
      this.map.push(Array.from(new Array(width), () => null));
    }
  }

  /**
   * Generates map by given strategy name
   * @param  {String} strategy File name in map strategies folder
   */
  generate(strategy) {
    this.strategy = require(`./strategies/map/${strategy}`);
    this.map = this.strategy.generate(this.map);
  }

  /**
   * If `x` and `y` is not provided will use map's default position
   * @param  {Player} player `Player` instance
   * @param  {Number} x      [Optional] Specific x
   * @param  {Number} y      [Optional] Specific y
   * @return {Object|Boolean} Coordinates in format {x,y} or false if failed to place player
   */
  placePlayer(player, x, y) {
    if(x && y) {
      this.map[x][y] = player;
      return {
        x: x,
        y: y
      };
    } else if(this.strategy.setPlayer) {
      let pos = this.strategy.setPlayer(this.map);
      this.map[pos.x][pos.y] = player;
      return pos;
    } else {
      return false;
    }
  }

  placeBots(amount, strategy) {
    if(this.strategy.setBots) {
      var bots = new Array(amount).fill(new Bot(0, 0, strategy));
      this.map = this.strategy.setBots(bots, this.map);
      return bots;
    } else {
      return false;
    }
  }

  placeBomb(bomb) {
    this.bombs.push(bomb);
  }

  /**
   * Initiating `destroyArea` for given bomb if it exists in map's bomb buffer
   * @param  {Bomb} bomb
   */
  detonateBomb(bomb) {
    let index = this.bombs.findIndex(b => b.x === bomb.x && b.y === bomb.y);
    if(index !== undefined) {
      this.bombs.splice(index, 1);
      this.map = bomb.destroyArea(this.map);
    }
  }

  /**
   * Removes entity for old location or replaces it with bomb
   * @param  {Object} oldLocation {x, y}
   * @param  {Object} entity      Entity to place that contain new location
   */
  moveEntity(oldLocation, entity) {
    var newLoc = entity.location;
    var bomb = this.bombs.find(b => b.x === oldLocation.x && b.y === oldLocation.y);
    this.map[oldLocation.x][oldLocation.y] = (bomb !== undefined) ? bomb : null;
    this.map[newLoc.x][newLoc.y] = entity;
  }

  // because Map.map sucks
  get current() {
    return this.map;
  }
}

module.exports = Map;
