import {
  initializeFormMetadata,
  applyBlurToFormMetadata
} from '../';

let metadata;
let updatedMetadata;

describe('applyBlurToFormMetadata', function() {
  describe('Given an initial metadata object for a single field', function() {
    beforeEach(function() {
      metadata = initializeFormMetadata({foo: 'bar'})
    });
    describe('the result of blurring the field', function() {
      beforeEach(function() {
        updatedMetadata = applyBlurToFormMetadata(metadata, 'foo'); 
      });
      it('shows the field as blurred', function() {
        expect(updatedMetadata.fields.foo.hasBlurred).to.equal(true);
      });
    });
    describe('the result of blurring a non-existent field', function() {
      beforeEach(function() {
        updatedMetadata = applyBlurToFormMetadata(metadata, 'bad'); 
      });
      it('shows the actual field as not blurred', function() {
        expect(updatedMetadata.fields.foo.hasBlurred).to.equal(false);
      });
      it('adds the non-existent field to the metadata', function() {
        expect(updatedMetadata.fields.bad.hasBlurred).to.equal( true);
      });
    });
  });
});
