'use strict';
const Entity = require('./base/entity');

class Block extends Entity {
  /**
   * @param  {Number}  x
   * @param  {Number}  y
   * @param  {String}  type
   * @param  {Boolean} isDestroyable [description]
   */
  constructor(x, y, type, isDestroyable) {
    super(x, y, isDestroyable);
    this.type = type;
  }
}

module.exports = Block;
