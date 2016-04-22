'use strict';
const _ = require('lodash');

const Map = require('./map');
const Player = require('./player');

const arrayDiff = require('./util/arrayDiff');

const BOMB_KEY = ' '; // Space
const UPDATE_INTERVAL = 250;
const BOT_AMOUNT = 3;

class Game {
  /**
   * @param  {WebSocket} socket
   * @param  {Object} options Could have `mapStrategy` and `botStrategy` properties
   */
  constructor(socket, options) {
    this.isGameRunning = true;
    this.ws = socket;
    this.options = options || {
      mapStrategy: 'basic',
      botStrategy: 'basic'
    };

    this.player = new Player();
    this.bots = [];
    this.map = new Map();

    this.ws.on('message', (packet) => {
      try {
        var message = JSON.parse(packet);
      } catch(err) {
        console.error('Failed to parse packet, skipping');
        return;
      }

      //---------------------
      // HANDLE PLAYER ACTION
      //---------------------
      if(message.type === 'keypress') {
        var oldLocation = _.cloneDeep(this.player.location);
        var oldMap = _.cloneDeep(this.map.current);

        if(message.key === BOMB_KEY) {
          this.player.setBomb(this.map)
          .then((bomb) => {
            this.map.detonateBomb(bomb);
            this.sendMapUpdate(oldMap);
          }).catch(function(error) {
            throw error;
          });

        } else if(this.player.move(this.map.current, message.key)) {
          this.map.moveEntity(oldLocation, this.player);
          this.sendMapUpdate(oldMap);
        }
      }
    });

    this.ws.on('close', () => {
      this.isGameRunning = false;
    });
  }

  start() {
    this.map.generate(this.options.mapStrategy);
    this.player.location = this.map.placePlayer(this.player);
    this.player.onDestroy(() => {
      this.sendGameOver();
    });

    // Spawn bots
    this.bots = this.map.placeBots(BOT_AMOUNT, this.options.botStrategy);
    this.bots.forEach((bot) => {
      bot.onDestroy(() => {
        let index = this.bots.findIndex((b) => b.x === bot.x && b.y === bot.y);
        if(index !== undefined) {
          this.ws.send(JSON.stringify({
            type: 'update',
            content: [
              {
                first: null,
                second: null,
                x: this.bots[index].x,
                y: this.bots[index].y
              }
            ]
          }));
          this.bots.splice(index, 1);
          if(this.bots.length === 0) {
            // Victory!
            this.sendGameOver(true);
          }
        }
      });
    });

    setInterval(() => {
      this.botTurn();
    }, UPDATE_INTERVAL);

    this.ws.send(JSON.stringify(this.map), function(err) {
      if(err) {
        console.error('ERROR ON INITIAL MAP SEND:', err.toString());
      }
    });
  }

  botTurn() {
    if(this.isGameRunning) {
      let oldMap = _.cloneDeep(this.map.current);
      this.bots.forEach((bot) => {
        var promise = bot.update(this.map);
        if(promise && promise.then) {
          promise.then(() => this.sendMapUpdate(oldMap));
        }
      });
      this.sendMapUpdate(oldMap);
    }
  }

  sendMapUpdate(oldMap) {
    this.ws.send(JSON.stringify({
      type: 'update',
      content: arrayDiff(oldMap, this.map.current)
    }), function(err) {
      if(err) {
        console.error('ERROR ON SENDING MAP UPDATE:', err.toString());
      }
    });
  }

  sendGameOver(success) {
    this.ws.send(JSON.stringify({
      type: 'gameover',
      result: success
    }), function(err) {
      if(err) {
        console.error('ERROR ON SENDING GAME OVER:', err.toString());
      }
    });
  }
}

module.exports = Game;
