import pairs from 'object-pairs';

const noop = () => {};

function createNode(doc, vdom) {
  if (typeof vdom === 'string') {
    return doc.createTextNode(vdom);
  }
  return doc.createElement(vdom.tagName);
}

function classListQuasiFill(elm) {
  const currentAttrs = elm.getAttribute('class');
  const current = currentAttrs ? currentAttrs.split(/\s/) : [];
  const finish = () => elm.setAttribute('class', current.join(' '));
  const cl = {
    add(c) {
      current.push(c);
    },

    remove(c) {
      const idx = current.indexOf(c);
      current.splice(idx, 1);
    },

    contains(c) {
      const idx = current.indexOf(c);
      return idx !== -1;
    }
  };

  return {cl, finish};
}

function buildElement(elm, vdom) {
  for (let propName of Object.keys(vdom.properties)) {
    const propValue = vdom.properties[propName];

    if (propName === 'className') {
      let cl;
      let finish;
      if (elm.classList) {
        [cl, finish] = [elm.classList, noop];
      } else {
        ({cl, finish} = classListQuasiFill(elm));
      }

      for (let [c, value] of pairs(propValue)) {
        if (value === null || value === false) {
          if (cl.contains(c)) {
            cl.remove(c);
          }
        } else {
          if (!cl.contains(c)) {
            cl.add(c);
          }
        }
      }

      finish();
    } else if (propName === 'style') {
      for (let styleProp of Object.keys(propValue)) {
        elm.style[styleProp] = propValue[styleProp];
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
}

function renderVDom(doc, vdom) {
  const elm = createNode(doc, vdom);
  if (typeof vdom === 'string') {
    return elm;
  }

  buildElement(elm, vdom);

  for (let child of vdom.children) {
    elm.appendChild(renderVDom(doc, child));
  }

  return elm;
}


export function renderCreate(doc, createOperation) {
  const fragment = doc.createDocumentFragment();
  for (let vdom of createOperation.fragment) {
    const elm = renderVDom(doc, vdom);
    fragment.appendChild(elm);
  }
  return fragment;
}


export function renderClear(doc, clearOperation) {
  const elms = doc.querySelectorAll(clearOperation.selector);
  for (let elm of [...elms]) {
    while (elm.firstChild) {
      elm.removeChild(elm.firstChild);
    }
  }
}


export function renderAppend(doc, appendOperation) {
  const elms = doc.querySelectorAll(appendOperation.selector);
  for (let elm of [...elms]) {
    elm.appendChild(renderCreate(doc, appendOperation));
  }
}


export function renderReplace(doc, replaceOperation) {
  const elms = doc.querySelectorAll(replaceOperation.selector);
  for (let elm of [...elms]) {
    while (elm.firstChild) {
      elm.removeChild(elm.firstChild);
    }
    elm.appendChild(renderCreate(doc, replaceOperation));
  }
}


export function renderAssign(doc, assignOperation) {
  const elms = doc.querySelectorAll(assignOperation.selector);
  for (let elm of [...elms]) {
    buildElement(elm, assignOperation.element);

    for (let child of assignOperation.element.children) {
      elm.appendChild(renderVDom(doc, child));
    }
  }
}


export function renderQuery(doc, queryOperation) {
  const elms = doc.querySelectorAll(queryOperation.selector);
  return [...elms].map(elm => {
    const props = {};
    for (let prop of queryOperation.properties) {
      props[prop] = elm[prop];
    }
    return props;
  });
}

const domineRender = (document) => (...domineOperation) => {
  const flattened = [];
  for (let op of domineOperation) {
    if (Array.isArray(op)) {
      flattened.push(...op);
    } else {
      flattened.push(op);
    }
  }

  for (let op of flattened) {
    switch (op.operation) {
      case 'create': renderCreate(document, op); break;
      case 'replace': renderReplace(document, op); break;
      case 'append': renderAppend(document, op); break;
      case 'query': renderQuery(document, op); break;
      case 'assign': renderAssign(document, op); break;
      case 'clear': renderClear(document, op); break;
      default: throw new Error(`Unknown operation ${op.operation}`);
    }
  }
};

export default domineRender;
