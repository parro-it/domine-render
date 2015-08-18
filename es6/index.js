const domineRender = (document) => (domineOperation) => {

};


export default domineRender;

function createNode(doc, vdom) {
  if (typeof vdom === 'string') {
    return doc.createTextNode(vdom);
  }
  return doc.createElement(vdom.tagName);
}

function buildElement(elm, vdom) {
  for (let propName of Object.keys(vdom.properties)) {
    const propValue = vdom.properties[propName];
    if (propName === 'className') {
      if (elm.classList) {
        for (let c of propValue) {
          elm.classList.add(c);
        }
      } else {
        elm.setAttribute('class', propValue.join(' '));
      }
    } else if (propName === 'style') {
      for (let styleProp of Object.keys(propValue)) {
        elm.style[styleProp] = propValue[styleProp];
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

