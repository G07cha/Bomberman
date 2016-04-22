var assert = require('assert');
var arrayDiff = require('../../lib/util/arrayDiff');

describe('array diff utility', function() {
  it('return difference in correct format', function() {
    var first = [[null, {type: 'same'}, {type: 'different'}]];
    var second = [[{type: 'exists'}, {type: 'same'}, {type: 'different2'}]];

    var difference = arrayDiff(first, second);

    assert.deepEqual(difference, [
      {
        x: 0, y: 0,
        first: first[0][0],
        second: second[0][0]
      },
      {
        x: 0, y: 2,
        first: first[0][2],
        second: second[0][2]
      }
    ]);
  });
});
