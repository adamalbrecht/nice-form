import initializeFormMetadata from '../initialize_form_metadata';
import { every, isObject, isEmpty } from 'lodash';
import { isBlank } from '../../util';

let metadata;
describe('initializeFormMetadata', function() {
  describe('Given an object with two fields', function() {
    const formData = { hello: 'world', foo: 'bar' };
    describe('the returned object', function() {
      let metadata;
      beforeEach(function() {
        metadata = initializeFormMetadata(formData);
      });
      it('has a nested object with properties for each field', function() {
        expect(isObject(metadata.fields.hello)).to.equal(true);
        expect(isObject(metadata.fields.foo)).to.equal(true);
      });
      it('has each field as valid', function() {
        expect(every(metadata.fields, (f) => f.valid)).to.equal(true);
        expect(every(metadata.fields, (f) => !f.invalid)).to.equal(true);
      });
      it('has each field as pristine', function() {
        expect(every(metadata.fields, (f) => f.pristine)).to.equal(true);
        expect(every(metadata.fields, (f) => !f.dirty)).to.equal(true);
      });
      it('has each field as not blurred', function() {
        expect(every(metadata.fields, (f) => !f.hasBlurred)).to.equal(true);
      });
      it('sets the initial and current value to the value given in the form data object', function() {
        expect(metadata.fields.hello.initialValue).to.equal('world');
        expect(metadata.fields.hello.currentValue).to.equal('world');
        expect(metadata.fields.foo.initialValue).to.equal('bar');
        expect(metadata.fields.foo.currentValue).to.equal('bar');
      });
      it('sets the error for each field to null', function() {
        expect(every(metadata.fields, (f) => isBlank(f.error))).to.equal(true);
      });
      it('has valid as true and invalid as false', function() {
        expect(metadata.valid).to.equal(true);
        expect(metadata.invalid).to.equal(false);
      });
      it('has pristine as true and dirty as false', function() {
        expect(metadata.pristine).to.equal(true);
        expect(metadata.dirty).to.equal(false);
      });
      it('has errors as an empty object', function() {
        expect(isObject(metadata.errors)).to.equal(true);
        expect(isEmpty(metadata.errors)).to.equal(true);
      });
      it('has formHasBeenSubmitted as false', function() {
        expect(metadata.formHasBeenSubmitted).to.equal(false);
      });
    });
  });
  describe('Given an object with 2 blank fields and a validator function that requires both', function() {
    const formData = { hello: null, foo: '' };
    function validator(data) {
      let errors = {};
      if (isBlank(data.hello)) {
        errors.hello = 'Required';
      }
      if (isBlank(data.foo)) {
        errors.foo = 'Bad';
      }
      return errors;
    };
    describe('the returned object', function() {
      beforeEach(function() {
        metadata = initializeFormMetadata(formData, validator);
      });
      it('sets the error for each field appropriately', function() {
        expect(metadata.fields.hello.error).to.equal('Required');
        expect(metadata.fields.foo.error).to.equal('Bad');
      });
      it('has valid as false and invalid as true', function() {
        expect(metadata.valid).to.equal(false);
        expect(metadata.invalid).to.equal(true);
      });
      it('has pristine as true and dirty as false', function() {
        expect(metadata.pristine).to.equal(true);
        expect(metadata.dirty).to.equal(false);
      });
      it('has errors as an object of error messages', function() {
        expect(metadata.errors.hello).to.equal('Required');
        expect(metadata.errors.foo).to.equal('Bad');
      });
      it('has formHasBeenSubmitted as false', function() {
        expect(metadata.formHasBeenSubmitted).to.equal(false);
      });
    });
  });
});
