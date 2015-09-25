import {
  applyErrorsToFormMetadata,
  initializeFormMetadata
} from '../';

let metadata;
let updatedMetadata;

describe('applyErrorsToFormMetadata', function() {
  describe('Given an initial metadata object for a single field', function() {
    beforeEach(function() {
      metadata = initializeFormMetadata({foo: 'bar'})
    });
    describe('after applying an error to the field', function() {
      beforeEach(function() {
        updatedMetadata = applyErrorsToFormMetadata(metadata, { foo: 'is not valid' });
      });
      it('sets the form to invalid', function() {
        expect(updatedMetadata.valid).to.equal(false);
        expect(updatedMetadata.invalid).to.equal(true);
      });
      it('sets the field to invalid', function() {

        expect(updatedMetadata.fields.foo.valid).to.equal(false);
        expect(updatedMetadata.fields.foo.invalid).to.equal(true);
      });
      it('sets the error object on the metadata', function() {
        expect(updatedMetadata.errors.foo).to.equal('is not valid');
      });
      it('sets the error message on the field', function() {
        expect(updatedMetadata.fields.foo.error).to.equal('is not valid');
      });
    });
  });
});
