var assert = require('assert');
var Block = require('../lib/block');

var e;
describe('Block class', function() {
  beforeEach(function() {
    e = new Block(2, 5, 'ohai', true);
  });

  it('save given type', function() {
    assert(e.isDestroyable);
    assert.deepEqual(e.location, {x: 2, y: 5});
    assert.equal(e.type, 'ohai');
  });
});
