const domineRender = (document) => (domineOperation) => {

};


export default domineRender;

function renderVDom(doc, vdom) {
  if (typeof vdom === 'string') {
    return doc.createTextNode(vdom);
  }
  const elm = doc.createElement(vdom.tagName);
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

