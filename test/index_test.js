let moduleRoot = '../es6';
if (process.env.TEST_RELEASE) {
  moduleRoot = '../dist';
}

const domineRender = require(moduleRoot).default;
const { renderCreate, renderClear, renderAppend, renderReplace, renderAssign } = require(moduleRoot);
import { create, clear, append, replace, assign } from 'domine';
import d from 'domine';


import jsdom from 'jsdom';
import thenify from 'thenify';
const env = thenify(jsdom.env).bind(jsdom);

async function emptyDoc() {
  const window = await env('<!doctype html5><html><body></body></html>');
  return window.document;
}

function makeVdom() {
  return d('main', {className: 'content'},
    d('h1', {style: {'font-size': 24}}),
    d('p')
  );
}

describe('domineRender', () => {
  it('return a function factory', async () => {
    const doc = await emptyDoc();
    const result = domineRender(doc);
    result.should.be.a('function');
  });
});

describe('renderAssign', () => {
  it('is a function', async () => {
    renderAssign.should.be.a('function');
  });

  it('assign properties to existing nodes', async () => {
    const doc = await emptyDoc();
    doc.body.innerHTML = '<div id="one">ciao</div><div id="two">salve</div>';
    renderAssign(doc, assign('#one', d('assign', {className: 'test', lang: 'en'})));
    doc.body.innerHTML.should.be.equal('<div id="one" class="test" lang="en">ciao</div><div id="two">salve</div>');
  });

  it('append children to existing nodes', async () => {
    const doc = await emptyDoc();
    doc.body.innerHTML = '<div id="one"><span></span></div><div id="two">salve</div>';
    renderAssign(doc, assign('#one', d('assign', d('main.forse'))));
    doc.body.innerHTML.should.be.equal('<div id="one"><span></span><main class="forse"></main></div><div id="two">salve</div>');
  });

  it('assign properties to each matched node', async () => {
    const doc = await emptyDoc();
    doc.body.innerHTML = '<div id="one">ciao</div><div id="two">salve</div>';
    renderAssign(doc, assign('div', d('assign', {className: 'test', lang: 'en'})));
    doc.body.innerHTML.should.be.equal('<div id="one" class="test" lang="en">ciao</div><div id="two" class="test" lang="en">salve</div>');
  });
});


describe('renderReplace', () => {
  it('is a function', async () => {
    renderReplace.should.be.a('function');
  });

  it('replace elements in nodes', async () => {
    const doc = await emptyDoc();
    doc.body.innerHTML = '<div id="one">ciao</div><div id="two">salve</div>';
    renderReplace(doc, replace('#one', d('main', d('article'))));
    doc.body.innerHTML.should.be.equal('<div id="one"><main><article></article></main></div><div id="two">salve</div>');
  });

  it('replace elements in each matched node', async () => {
    const doc = await emptyDoc();
    doc.body.innerHTML = '<div id="one">ciao</div><div id="two"><p>salve</p></div>';
    renderReplace(doc, replace('div', d('main')));
    doc.body.innerHTML.should.be.equal('<div id="one"><main></main></div><div id="two"><main></main></div>');
  });
});

describe('renderAppend', () => {
  it('is a function', async () => {
    renderAppend.should.be.a('function');
  });

  it('append elements to nodes', async () => {
    const doc = await emptyDoc();
    doc.body.innerHTML = '<div id="one">ciao</div><div id="two"></div>';
    renderAppend(doc, append('#one', d('main', d('article'))));
    doc.body.innerHTML.should.be.equal('<div id="one">ciao<main><article></article></main></div><div id="two"></div>');
  });

  it('append elements to each matched node', async () => {
    const doc = await emptyDoc();
    doc.body.innerHTML = '<div id="one">ciao</div><div id="two"></div>';
    renderAppend(doc, append('div', d('main')));
    doc.body.innerHTML.should.be.equal('<div id="one">ciao<main></main></div><div id="two"><main></main></div>');
  });
});

describe('renderClear', () => {
  it('is a function', async () => {
    renderClear.should.be.a('function');
  });

  it('remove element children', async () => {
    const doc = await emptyDoc();
    doc.body.innerHTML = '<div id="one"><span>1</span><span>2</span></div>ciao';
    renderClear(doc, clear('#one'));
    doc.body.innerHTML.should.be.equal('<div id="one"></div>ciao');
  });

  it('remove element children from multiple match', async () => {
    const doc = await emptyDoc();
    doc.body.innerHTML = '<div id="one"><span>1</span><span>2</span></div>ciao';
    renderClear(doc, clear('span'));
    doc.body.innerHTML.should.be.equal('<div id="one"><span></span><span></span></div>ciao');
  });
});

describe('renderCreate', () => {
  it('is a function', async () => {
    renderCreate.should.be.a('function');
  });

  it('return a document fragment', async () => {
    const doc = await emptyDoc();
    const fragment = renderCreate(doc, create(makeVdom()));
    fragment.constructor.name.should.be.equal('DocumentFragment');
  });

  async function check(expected, ...vdoms) {
    const doc = await emptyDoc();
    const fragment = renderCreate(doc, create(...vdoms));
    doc.body.appendChild(fragment);
    doc.body.innerHTML.should.be.equal(expected);
  }

  it('render tagName', async () => {
    await check('<main></main>', d('main'));
  });

  it('support multiple nodes', async () => {
    await check('<main></main><article></article>', d('main'), d('article'));
  });

  it('render properties', async () => {
    await check('<main id="important"></main>', d('main#important'));
  });

  it('render children', async () => {
    await check('<main><article></article></main>', d('main', d('article')));
  });

  it('support textNode', async () => {
    await check('<main>ciao</main>', d('main', 'ciao'));
  });

  it('support classes', async () => {
    await check('<main class="one two three four five"></main>', d('main.one',
      {className: {two: true}},
      {className: 'three'},
      {className: ['four', 'five']}
    ));
  });

  it('support style', async () => {
    await check('<main style="color: red; background: black; display: block; float: left;"></main>', d('main',
      {style: {color: 'red'}},
      {style: 'background:black; border:none'},
      {style: ['display:block', 'float:left']}
    ));
  });
});
