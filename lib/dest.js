var through = require('through2');

module.exports = function(element) {
  if (typeof element === 'string') {
    element = document.querySelector(element);
  }

  return through.obj(function(node, enc, cb) {
    var prop = 'value' in element ? 'value' : 'innerHTML';

    if (element) {
      element[prop] = node.contents.toString();
      cb(null, node);
    }
    else {
      cb(null);
    }
  });
}
