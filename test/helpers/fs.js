const fs = require('fs');
const jsregex = /\.js$/i;

function getDirectoryScripts(path, done, cb) {
  fs.readdir(path, function(err, files) {
    if(err) done(err);
    console.log('got some files', files);
    cb(files.filter(function(e) {
      return jsregex.exec(e);
    }));
  });
}

module.exports = {
  getDirectoryScripts: getDirectoryScripts
}
