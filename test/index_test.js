let moduleRoot = '../es6';
if (process.env.TEST_RELEASE) {
  moduleRoot = '../dist';
}

const domineRender = require(moduleRoot).default;
const { renderCreate } = require(moduleRoot);
import { create } from 'domine';
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

describe.only('renderCreate', () => {
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
