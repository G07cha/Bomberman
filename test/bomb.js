var assert = require('assert');
var Bomb = require('../lib/bomb');

var e;
describe('Block class', function() {
  beforeEach(function() {
    e = new Bomb(1, 1);
  });

  it('has correct properties and timeout', function() {
    assert(e.isDestroyable);
    assert.equal(e.type, 'bomb');
    assert.equal(typeof e.timeout, 'number');
  });
  describe('item check', function() {
    it('return true if item not null and destroyable', function() {
      assert(e.checkItem({isDestroyable: true}));
    });

    it('return false if item is not destroyable', function() {
      assert.equal(e.checkItem({isDestroyable: false}), false);
    });

    it('return false if item is null', function() {
      assert.equal(e.checkItem(null), false);
    })
  });
});
