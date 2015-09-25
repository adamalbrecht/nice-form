import {
  applyChangeToFormData
} from '../';

let data;
let updatedData;

describe('applyChangeToFormData', function() {
  describe('Given initial data object with a single field', function() {
    beforeEach(function() {
      data = { foo: 'bar' };
    });
    describe('after applying a change to the field', function() {
      beforeEach(function() {
        updatedData = applyChangeToFormData(data, 'foo', 'barbar');
      });
      it('is reflected in the updated data', function() {
        expect(updatedData.foo).to.equal('barbar');
      });
    });
    describe('after applying a change to a new field', function() {
      beforeEach(function() {
        updatedData = applyChangeToFormData(data, 'hello', 'world');
      });
      it('adds the field to the data', function() {
        expect(updatedData.hello).to.equal('world');
      });
    });
  });
});
