import React from 'react';
import { StatefulForm as Form, wrapFormHelper } from '../';
import { RenderedTestComponent } from '../../../test_helpers';
import { isEmpty } from 'lodash';

let myForm;
let myComponent;
let MyWrappedComponent;

let MyComponent = function({ formData, formMetadata }) {
  return (
    <div>
      <div className='form-data'>{ JSON.stringify(formData) }</div>
      <div className='form-metadata'>{ JSON.stringify(formMetadata) }</div>
    </div>
  );
}

describe('wrapFormHelper()', () => {
  describe('Given a simple wrapped component', () => {
    beforeEach(() => {
      MyWrappedComponent = wrapFormHelper(MyComponent);
    });
    describe('inside a stateful form with some data', () => {
      beforeEach(() => {
        const onSubmit = (data) => null;
        myForm = new RenderedTestComponent(
          <Form initialData={{foo: 'bar'}} onValidSubmit={onSubmit}>
            <MyWrappedComponent />
          </Form>
        );
      });
      it('passes down the form data successfully', () => {
        expect(myForm.query('.form-data').innerText).to.equal("{\"foo\":\"bar\"}");
      });
      it('passes down the form data successfully', () => {
        let parsedMetadata = JSON.parse(myForm.query('.form-metadata').innerText);
        expect(parsedMetadata.valid).to.equal(true);
        expect(isEmpty(parsedMetadata.errors)).to.equal(true);
        expect(isEmpty(parsedMetadata.fields.foo)).to.equal(false);
      });
    });
  });
});
