import React, { Component, PropTypes } from 'react';
import wrapInput from '../wrap_input.jsx';
import RenderedTestComponent from './rendered_test_component';
import { omit, cloneDeep } from 'lodash';
import TestUtils from 'react-addons-test-utils';

import EmptyForm from './empty_form.jsx';
import BasicForm from './basic_form.jsx';


let form;
let sandbox;

describe('Form', function() {
  beforeEach(function() {
    sandbox = sinon.sandbox.create();
  });
  afterEach(function() {
    sandbox.reset();
  });
  describe('Given an empty form with the minimum props', function() {
    beforeEach(() => { form = new RenderedTestComponent(<EmptyForm />) });
    it('renders given the minimum props', function() {
      expect(form.elementType()).to.equal('form');
    });
    it('sets novalidate on the form element', function() {
      expect(form.$element.is('[novalidate]')).to.equal(true);
    });
  });
  describe('Given a very basic form with 2 inputs and a button', function() {
    beforeEach(function() {
      form = new RenderedTestComponent(<BasicForm initialData={{hello: 'world'}} />);
    });
    it('renders the inputs and submit button', function() {
      expect(form.$element.find('input:text').length).to.equal(2);
      expect(form.$element.find('button').length).to.equal(1);
    });
    it('fills in the input with the value from the form data', function() {
      expect(form.$element.find('input[name=hello]').val()).to.equal('world');
    });
    describe('and the input text is edited', function() {
      let onChangeSpy;
      beforeEach(function() {
        form.query('input[name=hello]').value = 'moon';
        TestUtils.Simulate.change(form.query('input[name=hello]'));
      });
      it('Updates the property in the data', function() {
        expect(form.$element.find('input[name=hello]').val()).to.equal('moon');
      });
    });
  });
});
