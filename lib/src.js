var File = require('vinyl');
var Readable = require('stream').Readable;

/**
 * Creates a stream out of the inner HTML or value of a DOM element.
 * @param {string|object} - CSS selector or DOM element to use.
 */
module.exports = function(element) {
  var stream = new Readable({ objectMode: true });
  var value;

  if (typeof element === 'string') {
    element = document.querySelector(element);
  }

  if (element) {
    value = element.value || element.innerHTML;
    stream.push(new File({
      path: element.id || '',
      contents: new Buffer(value)
    }));
  }

  stream.push(null);

  return stream;
}
