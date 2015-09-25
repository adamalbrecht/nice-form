import {
  applyChangeToFormMetadata,
  initializeFormMetadata
} from '../';

let metadata;
let updatedMetadata;

describe('applyChangeToFormMetadata', function() {
  describe('Given an initial metadata object for a single field', function() {
    beforeEach(function() {
      metadata = initializeFormMetadata({foo: 'bar'})
    });
    describe('after applying a change to the field', function() {
      beforeEach(function() {
        updatedMetadata = applyChangeToFormMetadata(metadata, 'foo', 'barbar');
      });
      it('sets the form and field metadata to dirty', function() {
        expect(updatedMetadata.pristine).to.equal(false);
        expect(updatedMetadata.dirty).to.equal(true);
        expect(updatedMetadata.fields.foo.pristine).to.equal(false);
        expect(updatedMetadata.fields.foo.dirty).to.equal(true);
      });
      it('sets the field currentValue, but not the initial value', function() {
        expect(updatedMetadata.fields.foo.initialValue).to.equal('bar');
        expect(updatedMetadata.fields.foo.currentValue).to.equal('barbar');
      });
    });
  });
});

