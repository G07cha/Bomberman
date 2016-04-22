const assert = require('assert');
const fsHelper = require('../helpers/fs');

const folderPath = '../../lib/strategies/map/';

var maps = [];


describe('Map strategies', function() {
  before(function(done) {
    console.log('am i called?');
    fsHelper.getDirectoryScripts(folderPath, done, function(files) {
      console.log(files);
      maps = files
      done();
    });
  });
  describe('Check', function() {
    console.log('MAPS', maps);
    maps.forEach(function(mapFile) {
      it(mapFile + 'has single function', function() {
        assert.equals(typeof require(folderPath + mapFile), 'function');
      });
    });
  })
});
