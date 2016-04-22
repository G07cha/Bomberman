/**
 * Find different elements between two double dimension arrays by type
 * @param  {Array} first
 * @param  {Array} second
 * @return {Array} Collection in format {first, second, x, y}
 */
module.exports = function arrayDiff(first, second) {
  var diff = [];
  for(var i = 0; i < first.length; i++) {
    for(var j = 0; j < first[i].length; j++) {
      var fElem = first[i][j];
      var sElem = second[i][j];
      if(fElem && sElem) {
        if(fElem.type !== sElem.type) {
          diff.push({
            x: i,
            y: j,
            first: fElem,
            second: sElem
          });
        }
      } else if (fElem !== sElem) {
        diff.push({
          x: i,
          y: j,
          first: fElem,
          second: sElem
        });
      }
    }
  }

  return diff;
};
