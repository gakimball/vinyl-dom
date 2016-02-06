var assert = require('assert');
var dom = require('..');
var File = require('vinyl');

var ID = 'test';
var VALUE = 'Test';
var HTML = '<p>Test</p>';

describe('Vinyl DOM (Inputs)', function() {
  var e;

  before(function(done) {
    e = document.createElement('textarea');
    e.id = ID;
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
    dom.src('#test')
      .on('data', function(data) {
        assert.ok(data instanceof File, 'Object is a Vinyl file');
        assert.equal(data.path, ID, 'Path is the ID of the input');
        assert.equal(data.contents.toString(), VALUE, 'Contents are the value of the input');
        done();
      });
  });
});

describe('Vinyl DOM (Elements)', function() {
  var e;

  before(function(done) {
    e = document.createElement('div');
    e.id = ID;
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
    dom.src('#test')
      .on('data', function(data) {
        assert.ok(data instanceof File, 'Object is a Vinyl file');
        assert.equal(data.path, ID, 'Path is the ID of the input');
        assert.equal(data.contents.toString(), HTML, 'Contents are the value of the input');
        done();
      });
  });
});
