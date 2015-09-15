import isBlank from '../is_blank';

describe('isBlank', function() {
  it('returns true for null and undefined', function() {
    expect(isBlank(null)).to.equal(true);
    expect(isBlank(undefined)).to.equal(true);
  });
  it('returns true for empty strings', function() {
    expect(isBlank('')).to.equal(true);
  });
  it('returns true for strings of only spaces', function() {
    expect(isBlank(' ')).to.equal(true);
    expect(isBlank('  ')).to.equal(true);
  });
  it('returns true for strings of only other types of whitespace', function() {
    expect(isBlank('\r\n')).to.equal(true);
  });
  it('returns false for actual strings', function() {
    expect(isBlank('hello')).to.equal(false);
  });
  it('returns false for all numbers', function() {
    expect(isBlank(2)).to.equal(false);
    expect(isBlank(1)).to.equal(false);
    expect(isBlank(0)).to.equal(false);
    expect(isBlank(-1)).to.equal(false);
  });
});
