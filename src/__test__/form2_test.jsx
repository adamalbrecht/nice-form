import React, { Component, PropTypes } from 'react';
import Form2 from '../form2.jsx';
import wrapInput from '../wrap_input.jsx';
import RenderedTestComponent from './rendered_test_component';
import { omit } from 'lodash';

let minimumProps = {
  formData: {},
  metaData: {},
  onChange: data => null,
  onValidSubmit: data => null
};

class BasicInputRaw extends Component {
  render() {
    return <input {...this.props} />;
  }
}
const BasicInput = wrapInput(BasicInputRaw);

let form;

describe('Form', function() {
  describe('that is empty and with the minimum props', function() {
    beforeEach(() => { form = new RenderedTestComponent(<Form2 { ...minimumProps } />) });
    it('renders given the minimum props', function() {
      expect(form.elementType()).to.equal('form');
    });
    it('sets novalidate on the form element', function() {
      expect(form.$element.is('[novalidate]')).to.equal(true);
    });
  });
  describe('with an input component and submit button', function() {
    beforeEach(function() {
      const props = { ...minimumProps, formData: { foo: 'bar' } };
      form = new RenderedTestComponent(
        <Form2 { ...props }>
          <BasicInput name='foo' />
          <button>Submit</button>
        </Form2>
      );
    });
    it('renders the input and submit button', function() {
      expect(form.$element.find('input:text').length).to.equal(1);
      expect(form.$element.find('button').length).to.equal(1);
    });
    it('fills in the input with the value from formData', function() {
      expect(form.$element.find('input[name=foo]').val()).to.equal('bar');
    });
  });
});
