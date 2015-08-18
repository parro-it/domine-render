'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.renderCreate = renderCreate;
exports.renderClear = renderClear;
exports.renderAppend = renderAppend;
exports.renderReplace = renderReplace;
exports.renderAssign = renderAssign;
exports.renderQuery = renderQuery;

function createNode(doc, vdom) {
  if (typeof vdom === 'string') {
    return doc.createTextNode(vdom);
  }
  return doc.createElement(vdom.tagName);
}

function buildElement(elm, vdom) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(_Object$keys(vdom.properties)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var propName = _step.value;

      var propValue = vdom.properties[propName];
      if (propName === 'className') {
        if (elm.classList) {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = _getIterator(propValue), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var c = _step2.value;

              elm.classList.add(c);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                _iterator2['return']();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        } else {
          elm.setAttribute('class', propValue.join(' '));
        }
      } else if (propName === 'style') {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = _getIterator(_Object$keys(propValue)), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var styleProp = _step3.value;

            elm.style[styleProp] = propValue[styleProp];
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3['return']) {
              _iterator3['return']();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      } else if (propName.startsWith('data-')) {
        if (elm.dataset) {
          elm.dataset[propName.slice(5)] = propValue;
        } else {
          elm.setAttribute(propName, propValue);
        }
      } else {
        elm[propName] = propValue;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

function renderVDom(doc, vdom) {
  var elm = createNode(doc, vdom);
  if (typeof vdom === 'string') {
    return elm;
  }

  buildElement(elm, vdom);

  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = _getIterator(vdom.children), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var child = _step4.value;

      elm.appendChild(renderVDom(doc, child));
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4['return']) {
        _iterator4['return']();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return elm;
}

function renderCreate(doc, createOperation) {
  var fragment = doc.createDocumentFragment();
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = _getIterator(createOperation.fragment), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var vdom = _step5.value;

      var elm = renderVDom(doc, vdom);
      fragment.appendChild(elm);
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5['return']) {
        _iterator5['return']();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  return fragment;
}

function renderClear(doc, clearOperation) {
  var elms = doc.querySelectorAll(clearOperation.selector);

  var _arr = [].concat(_toConsumableArray(elms));

  for (var _i = 0; _i < _arr.length; _i++) {
    var elm = _arr[_i];
    while (elm.firstChild) {
      elm.removeChild(elm.firstChild);
    }
  }
}

function renderAppend(doc, appendOperation) {
  var elms = doc.querySelectorAll(appendOperation.selector);

  var _arr2 = [].concat(_toConsumableArray(elms));

  for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
    var elm = _arr2[_i2];
    elm.appendChild(renderCreate(doc, appendOperation));
  }
}

function renderReplace(doc, replaceOperation) {
  var elms = doc.querySelectorAll(replaceOperation.selector);

  var _arr3 = [].concat(_toConsumableArray(elms));

  for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
    var elm = _arr3[_i3];
    while (elm.firstChild) {
      elm.removeChild(elm.firstChild);
    }
    elm.appendChild(renderCreate(doc, replaceOperation));
  }
}

function renderAssign(doc, assignOperation) {
  var elms = doc.querySelectorAll(assignOperation.selector);

  var _arr4 = [].concat(_toConsumableArray(elms));

  for (var _i4 = 0; _i4 < _arr4.length; _i4++) {
    var elm = _arr4[_i4];
    buildElement(elm, assignOperation.element);

    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = _getIterator(assignOperation.element.children), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        var child = _step6.value;

        elm.appendChild(renderVDom(doc, child));
      }
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6['return']) {
          _iterator6['return']();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }
  }
}

function renderQuery(doc, queryOperation) {
  var elms = doc.querySelectorAll(queryOperation.selector);
  return [].concat(_toConsumableArray(elms)).map(function (elm) {
    var props = {};
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
      for (var _iterator7 = _getIterator(queryOperation.properties), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
        var prop = _step7.value;

        props[prop] = elm[prop];
      }
    } catch (err) {
      _didIteratorError7 = true;
      _iteratorError7 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion7 && _iterator7['return']) {
          _iterator7['return']();
        }
      } finally {
        if (_didIteratorError7) {
          throw _iteratorError7;
        }
      }
    }

    return props;
  });
}

var domineRender = function domineRender(document) {
  return function () {
    for (var _len = arguments.length, domineOperation = Array(_len), _key = 0; _key < _len; _key++) {
      domineOperation[_key] = arguments[_key];
    }

    var flattened = [];
    var _iteratorNormalCompletion8 = true;
    var _didIteratorError8 = false;
    var _iteratorError8 = undefined;

    try {
      for (var _iterator8 = _getIterator(domineOperation), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
        var op = _step8.value;

        if (Array.isArray(op)) {
          flattened.push.apply(flattened, _toConsumableArray(op));
        } else {
          flattened.push(op);
        }
      }
    } catch (err) {
      _didIteratorError8 = true;
      _iteratorError8 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion8 && _iterator8['return']) {
          _iterator8['return']();
        }
      } finally {
        if (_didIteratorError8) {
          throw _iteratorError8;
        }
      }
    }

    var _iteratorNormalCompletion9 = true;
    var _didIteratorError9 = false;
    var _iteratorError9 = undefined;

    try {
      for (var _iterator9 = _getIterator(domineOperation), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
        var op = _step9.value;

        switch (op.operation) {
          case 'create':
            return renderCreate(document, op);
          case 'replace':
            return renderReplace(document, op);
          case 'append':
            return renderAppend(document, op);
          case 'query':
            return renderQuery(document, op);
          case 'assign':
            return renderAssign(document, op);
          case 'clear':
            return renderClear(document, op);
          default:
            throw new Error('Unknown operation ' + op.operation);
        }
      }
    } catch (err) {
      _didIteratorError9 = true;
      _iteratorError9 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion9 && _iterator9['return']) {
          _iterator9['return']();
        }
      } finally {
        if (_didIteratorError9) {
          throw _iteratorError9;
        }
      }
    }
  };
};

exports['default'] = domineRender;