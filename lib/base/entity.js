'use strict';

class Entity {
  constructor(x, y, isDestroyable) {
    this.x = x;
    this.y = y;
    this.isDestroyable = isDestroyable || false;
  }

  /**
   * Return entity position
   * @return {Object} Location in format {x, y}
   */
  get location() {
    return { x: this.x, y: this.y };
  }

  set location(newLocation) {
    this.x = newLocation.x;
    this.y = newLocation.y;
  }
}

module.exports = Entity;
