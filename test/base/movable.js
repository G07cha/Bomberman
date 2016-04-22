var assert = require('assert');
var Movable = require('../../lib/base/movable');
var some = require('lodash').some;

var e;
describe('Movable class', function() {
  beforeEach(function() {
    e = new Movable(0, 0);
  });

  it('has zero speed at start', function() {
    assert.equal(e.currentSpeed, 0);
  });

  it('emit onDestroy hook when when destroy method is called', function(done) {
    e.onDestroy(done);
    e.destroy();
  });

  it('call resolve function after bomb timeout', function(done) {
    this.timeout(4000);

    var fakeMap = {
      placeBomb: function(bomb) {
        assert.deepEqual(bomb.location, e.location);
        assert.equal(bomb.type, 'bomb');
      }
    };

    e.placeBomb(fakeMap, function(bomb) {
      assert.deepEqual(bomb.location, e.location);
      assert.equal(bomb.type, 'bomb');
      done();
    });
  });

  describe('Movement', function() {
    it('change entity location when move is called', function() {
      var fakeMap = [[null], [null]];

      assert(e.move(fakeMap, 'd'), 'Entity isn\'t moved');
      assert.deepEqual(e.location, {x: 1, y: 0});
    });

    it('limit movement speed to 4 per second', function() {
      var fakeMap = [[null], [null]];

      assert(e.move(fakeMap, 'd'), 'Entity isn\'t moved 1');
      assert(e.move(fakeMap, 'a'), 'Entity isn\'t moved 2');
      assert(e.move(fakeMap, 'd'), 'Entity isn\'t moved 3');
      assert(e.move(fakeMap, 'a'), 'Entity isn\'t moved 4');
      assert.equal(e.move(fakeMap, 'a'), false,
      'Entity moved after exceeded speed limit');
    });

    it('don\'t move out of the map', function() {
      var fakeMap = [[null]];

      assert.equal(e.move(fakeMap, 'a'), false, 'Moved out of the map');
      assert.deepEqual(e.location, {x: 0, y: 0});
    });

    it('don\'t move to non-free cell', function() {
      var fakeMap = [[null], ['not even free cell']];

      assert.equal(e.move(fakeMap, 'a'), false, 'Moved to non-free cell');
      assert.deepEqual(e.location, {x: 0, y: 0});
    });
  });
});
