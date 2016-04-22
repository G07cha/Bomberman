var assert = require('assert');
var Entity = require('../../lib/base/entity');

var e;
describe('Entity class', function() {
  beforeEach(function() {
    e = new Entity(1, 2, true);
  });

  it('should save properties', function() {
    assert.equal(e.x, 1);
    assert.equal(e.y, 2);
    assert(e.isDestroyable);
  });

  it('should return location in {x, y} format', function() {
    assert.deepEqual(e.location, {x: 1, y: 2});
  });

  it('should set location in {x, y} format', function() {
    var newLocation = {x: 6, y: 8};
    e.location = newLocation
    assert.deepEqual(e.location, newLocation);
  });
});
