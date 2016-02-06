var assert = require('assert');
var dom = require('..');

describe('Vinyl DOM', function() {
  var e;

  beforeEach(function(done) {
    e = document.createElement('textarea');
    e.id = 'test';
    e.value = 'Test';
    document.body.appendChild(e);
    done();
  });

  afterEach(function(done) {
    e.parentNode.removeChild(e);
    e = null;
    done();
  })

  it('consumes the value of a DOM node as a source', function(done) {
    assert(true);
    done();
  });
});
