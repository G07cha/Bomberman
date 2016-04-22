const server = require('http').createServer(),
  url = require('url'),
  WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({ server }),
  express = require('express'),
  app = express(),
  port = process.env.PORT || 4080;

const Game = require('./lib/game');

app.use(express.static('static'));

wss.on('connection', function(ws) {
  var game = new Game(ws);
  game.start();
});

server.on('request', app);
server.listen(port, function () {
  console.log('Listening on ' + server.address().port);
});
