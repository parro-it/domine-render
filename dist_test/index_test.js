'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _domine = require('domine');

var _domine2 = _interopRequireDefault(_domine);

var _jsdom = require('jsdom');

var _jsdom2 = _interopRequireDefault(_jsdom);

var _thenify = require('thenify');

var _thenify2 = _interopRequireDefault(_thenify);

var moduleRoot = '../es6';
if (process.env.TEST_RELEASE) {
  moduleRoot = '../dist';
}

var domineRender = require(moduleRoot)['default'];

var _require = require(moduleRoot);

var renderCreate = _require.renderCreate;
var renderClear = _require.renderClear;
var renderAppend = _require.renderAppend;
var renderReplace = _require.renderReplace;
var renderAssign = _require.renderAssign;
var renderQuery = _require.renderQuery;

var env = (0, _thenify2['default'])(_jsdom2['default'].env).bind(_jsdom2['default']);

function emptyDoc() {
  var window;
  return _regeneratorRuntime.async(function emptyDoc$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(env('<!doctype html5><html><body></body></html>'));

      case 2:
        window = context$1$0.sent;
        return context$1$0.abrupt('return', window.document);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function makeVdom() {
  return (0, _domine2['default'])('main', { className: 'content' }, (0, _domine2['default'])('h1', { style: { 'font-size': 24 } }), (0, _domine2['default'])('p'));
}

describe('domineRender', function () {
  it('return a function factory', function callee$1$0() {
    var doc, result;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(emptyDoc());

        case 2:
          doc = context$2$0.sent;
          result = domineRender(doc);

          result.should.be.a('function');

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});

describe('renderQuery', function () {
  it('is a function', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          renderQuery.should.be.a('function');

        case 1:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('query properties of existing nodes', function callee$1$0() {
    var doc, result;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(emptyDoc());

        case 2:
          doc = context$2$0.sent;

          doc.body.innerHTML = '<div id="one">ciao</div><div id="two">salve</div>';
          result = renderQuery(doc, (0, _domine.query)('div', ['id']));

          result.should.be.deep.equal([{ id: 'one' }, { id: 'two' }]);

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});

describe('renderAssign', function () {
  it('is a function', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          renderAssign.should.be.a('function');

        case 1:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('assign properties to existing nodes', function callee$1$0() {
    var doc;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(emptyDoc());

        case 2:
          doc = context$2$0.sent;

          doc.body.innerHTML = '<div id="one">ciao</div><div id="two">salve</div>';
          renderAssign(doc, (0, _domine.assign)('#one', (0, _domine2['default'])('assign', { className: 'test', lang: 'en' })));
          doc.body.innerHTML.should.be.equal('<div id="one" class="test" lang="en">ciao</div><div id="two">salve</div>');

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('append children to existing nodes', function callee$1$0() {
    var doc;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(emptyDoc());

        case 2:
          doc = context$2$0.sent;

          doc.body.innerHTML = '<div id="one"><span></span></div><div id="two">salve</div>';
          renderAssign(doc, (0, _domine.assign)('#one', (0, _domine2['default'])('assign', (0, _domine2['default'])('main.forse'))));
          doc.body.innerHTML.should.be.equal('<div id="one"><span></span><main class="forse"></main></div><div id="two">salve</div>');

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('assign properties to each matched node', function callee$1$0() {
    var doc;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(emptyDoc());

        case 2:
          doc = context$2$0.sent;

          doc.body.innerHTML = '<div id="one">ciao</div><div id="two">salve</div>';
          renderAssign(doc, (0, _domine.assign)('div', (0, _domine2['default'])('assign', { className: 'test', lang: 'en' })));
          doc.body.innerHTML.should.be.equal('<div id="one" class="test" lang="en">ciao</div><div id="two" class="test" lang="en">salve</div>');

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});

describe('renderReplace', function () {
  it('is a function', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          renderReplace.should.be.a('function');

        case 1:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('replace elements in nodes', function callee$1$0() {
    var doc;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(emptyDoc());

        case 2:
          doc = context$2$0.sent;

          doc.body.innerHTML = '<div id="one">ciao</div><div id="two">salve</div>';
          renderReplace(doc, (0, _domine.replace)('#one', (0, _domine2['default'])('main', (0, _domine2['default'])('article'))));
          doc.body.innerHTML.should.be.equal('<div id="one"><main><article></article></main></div><div id="two">salve</div>');

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('replace elements in each matched node', function callee$1$0() {
    var doc;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(emptyDoc());

        case 2:
          doc = context$2$0.sent;

          doc.body.innerHTML = '<div id="one">ciao</div><div id="two"><p>salve</p></div>';
          renderReplace(doc, (0, _domine.replace)('div', (0, _domine2['default'])('main')));
          doc.body.innerHTML.should.be.equal('<div id="one"><main></main></div><div id="two"><main></main></div>');

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});

describe('renderAppend', function () {
  it('is a function', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          renderAppend.should.be.a('function');

        case 1:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('append elements to nodes', function callee$1$0() {
    var doc;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(emptyDoc());

        case 2:
          doc = context$2$0.sent;

          doc.body.innerHTML = '<div id="one">ciao</div><div id="two"></div>';
          renderAppend(doc, (0, _domine.append)('#one', (0, _domine2['default'])('main', (0, _domine2['default'])('article'))));
          doc.body.innerHTML.should.be.equal('<div id="one">ciao<main><article></article></main></div><div id="two"></div>');

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('append elements to each matched node', function callee$1$0() {
    var doc;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(emptyDoc());

        case 2:
          doc = context$2$0.sent;

          doc.body.innerHTML = '<div id="one">ciao</div><div id="two"></div>';
          renderAppend(doc, (0, _domine.append)('div', (0, _domine2['default'])('main')));
          doc.body.innerHTML.should.be.equal('<div id="one">ciao<main></main></div><div id="two"><main></main></div>');

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});

describe('renderClear', function () {
  it('is a function', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          renderClear.should.be.a('function');

        case 1:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('remove element children', function callee$1$0() {
    var doc;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(emptyDoc());

        case 2:
          doc = context$2$0.sent;

          doc.body.innerHTML = '<div id="one"><span>1</span><span>2</span></div>ciao';
          renderClear(doc, (0, _domine.clear)('#one'));
          doc.body.innerHTML.should.be.equal('<div id="one"></div>ciao');

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('remove element children from multiple match', function callee$1$0() {
    var doc;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(emptyDoc());

        case 2:
          doc = context$2$0.sent;

          doc.body.innerHTML = '<div id="one"><span>1</span><span>2</span></div>ciao';
          renderClear(doc, (0, _domine.clear)('span'));
          doc.body.innerHTML.should.be.equal('<div id="one"><span></span><span></span></div>ciao');

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});

describe('renderCreate', function () {
  it('is a function', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          renderCreate.should.be.a('function');

        case 1:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('return a document fragment', function callee$1$0() {
    var doc, fragment;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(emptyDoc());

        case 2:
          doc = context$2$0.sent;
          fragment = renderCreate(doc, (0, _domine.create)(makeVdom()));

          fragment.constructor.name.should.be.equal('DocumentFragment');

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  function check(expected) {
    for (var _len = arguments.length, vdoms = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      vdoms[_key - 1] = arguments[_key];
    }

    var doc, fragment;
    return _regeneratorRuntime.async(function check$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(emptyDoc());

        case 2:
          doc = context$2$0.sent;
          fragment = renderCreate(doc, _domine.create.apply(undefined, vdoms));

          doc.body.appendChild(fragment);
          doc.body.innerHTML.should.be.equal(expected);

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  }

  it('render tagName', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(check('<main></main>', (0, _domine2['default'])('main')));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('support multiple nodes', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(check('<main></main><article></article>', (0, _domine2['default'])('main'), (0, _domine2['default'])('article')));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('render properties', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(check('<main id="important"></main>', (0, _domine2['default'])('main#important')));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('render children', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(check('<main><article></article></main>', (0, _domine2['default'])('main', (0, _domine2['default'])('article'))));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('render data attributes', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(check('<main data-custom="42"></main>', (0, _domine2['default'])('main', { 'data-custom': 42 })));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('support textNode', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(check('<main>ciao</main>', (0, _domine2['default'])('main', 'ciao')));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('support classes', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(check('<main class="one two three four five"></main>', (0, _domine2['default'])('main.one', { className: { two: true } }, { className: 'three' }, { className: ['four', 'five'] })));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('support style', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(check('<main style="color: red; background: black; display: block; float: left;"></main>', (0, _domine2['default'])('main', { style: { color: 'red' } }, { style: 'background:black; border:none' }, { style: ['display:block', 'float:left'] })));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});