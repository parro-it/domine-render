let moduleRoot = '../es6';
if (process.env.TEST_RELEASE) {
  moduleRoot = '../dist';
}

const domineRender = require(moduleRoot);

describe('domineRender', () => {
  it('works', async () => {
    const result = await domineRender();
    result.should.be.equal(42);
  });
});

