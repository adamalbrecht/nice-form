import humanize from '../humanize';

describe('humanize', function() {
  it('converts underscored strings to words with spaces', function() {
    expect(humanize('hello_world')).to.equal('Hello World');
  });
  it('upcases words in a sentence', function() {
    expect(humanize('hello world')).to.equal('Hello World');
  });
});
