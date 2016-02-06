var assert = require('assert');
var dom = require('..');
var File = require('vinyl');

var INPUT = 'input';
var OUTPUT = 'output';
var VALUE = 'Test';
var HTML = '<p>Test</p>';

describe('Vinyl DOM (Inputs)', function() {
  var e;

  before(function(done) {
    e = document.createElement('textarea');
    e.id = INPUT;
    e.value = VALUE;

    document.body.appendChild(e);
    done();
  });

  after(function(done) {
    e.parentNode.removeChild(e);
    e = null;
    done();
  });

  it('consumes the value of a form field as a source', function(done) {
    dom.src('#'+INPUT)
      .on('data', function(data) {
        assert.ok(data instanceof File, 'Object is a Vinyl file');
        assert.equal(data.path, INPUT, 'Path is the ID of the input');
        assert.equal(data.contents.toString(), VALUE, 'Contents are the value of the input');
        done();
      });
  });

  it('writes the value of a stream to a form field', function(done) {
    var o = document.createElement('input');
    o.id = OUTPUT;
    document.body.appendChild(o);

    dom.src('#'+INPUT)
      .pipe(dom.dest('#'+OUTPUT))
      .on('data', function(data) {
        assert.ok(data instanceof File, 'Function is a passthrough');
        assert.equal(o.value, VALUE, 'Value from stream is written to destination node');
        o.parentNode.removeChild(o);
        done();
      });
  });
});

describe('Vinyl DOM (Elements)', function() {
  var e;

  before(function(done) {
    e = document.createElement('div');
    e.id = INPUT;
    e.innerHTML = HTML;
    document.body.appendChild(e);
    done();
  });

  after(function(done) {
    e.parentNode.removeChild(e);
    e = null;
    done();
  });

  it('consumes the inner HTML of an element as a source', function(done) {
    dom.src('#'+INPUT)
      .on('data', function(data) {
        assert.ok(data instanceof File, 'Object is a Vinyl file');
        assert.equal(data.path, INPUT, 'Path is the ID of the input');
        assert.equal(data.contents.toString(), HTML, 'Contents are the value of the input');
        done();
      });
  });

  it('writes the value of a stream to an element\'s inner HTML', function(done) {
    var o = document.createElement('div');
    o.id = OUTPUT;
    document.body.appendChild(o);

    dom.src('#'+INPUT)
      .pipe(dom.dest('#'+OUTPUT))
      .on('data', function(data) {
        assert.ok(data instanceof File, 'Function is a passthrough');
        assert.equal(o.innerHTML, HTML, 'Value from stream is written to destination node');
        o.parentNode.removeChild(o);
        done();
      });
  });
});
