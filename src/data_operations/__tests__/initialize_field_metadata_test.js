import initializeFieldMetadata from '../initialize_field_metadata';

let result;

describe('initializeFieldMetadata()', function() {
  describe('Given a null value and initial metadata', function() {
    beforeEach(function() {
      result = initializeFieldMetadata(null, null);
    });
    it('returns defaults for all the metadata fields', function() {
      expect(result.initialValue).to.equal(null);
      expect(result.currentValue).to.equal(null);
      expect(result.error).to.equal(null);
      expect(result.valid).to.equal(true);
      expect(result.invalid).to.equal(false);
      expect(result.pristine).to.equal(true);
      expect(result.dirty).to.equal(false);
      expect(result.hasBlurred).to.equal(false);
    });
  });
});
