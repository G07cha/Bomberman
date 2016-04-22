const Block = require('../../block');
const Bot = require('../../bot');

module.exports = {
  setPlayer: function() {
    return {x: 0, y: 0};
  },

  setBots: function(bots, map) {
    const locations = [{x: 0, y: map[0].length - 1},
    {x: map.length - 1, y: map[0].length - 1}, {x: map.length - 1, y: 0}];

    for (var i = 0; i < locations.length; i++) {
      bots[i] = new Bot(locations[i].x, locations[i].y, 'basic');
      map[locations[i].x][locations[i].y] = bots[i];
    }

    return map;
  },

  generate: function(map) {
    for(var i = 0; i < map.length; i++) {
      for(var j = 0; j < map[i].length; j++) {
        if(i % 2 === 1 && j % 2 === 1) {
          // Set undestroyable wall for odd coordinates
          map[i][j] = new Block(i, j, 'wall');
        } else if (Math.floor(Math.random() * 10) > 5 &&
        (i > 1 || j > 1)) { // Checking for clear player's corner
          map[i][j] = new Block(i, j, 'crate', true);
        }
      }
    }

    return map;
  }
}
