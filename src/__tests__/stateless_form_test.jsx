import React, { Component, PropTypes } from 'react';
import wrapInput from '../wrap_input.jsx';
import RenderedTestComponent from './rendered_test_component';
import { omit, cloneDeep } from 'lodash';
import TestUtils from 'react-addons-test-utils';

import EmptyForm from './empty_form.jsx';
import BasicForm from './basic_form.jsx';


let form;
let sandbox;

describe('StatelessForm', function() {
  beforeEach(function() {
    sandbox = sinon.sandbox.create();
  });
  afterEach(function() {
    sandbox.restore();
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
    let handleChangeSpy;
    let handleValidSubmitSpy;
    beforeEach(function() {
      handleChangeSpy = sinon.spy();
      handleValidSubmitSpy = sinon.spy();
      form = new RenderedTestComponent(<BasicForm initialData={{hello: 'world'}} onChange={handleChangeSpy} onValidSubmit={handleValidSubmitSpy} />);
    });
    it('renders the inputs and submit button', function() {
      expect(form.$element.find('input:text').length).to.equal(2);
      expect(form.$element.find('button').length).to.equal(1);
    });
    it('fills in the input with the value from the form data', function() {
      expect(form.$element.find('input[name=hello]').val()).to.equal('world');
    });
    describe('and the input text is edited', function() {
      beforeEach(function() {
        form.query('input[name=hello]').value = 'moon';
        TestUtils.Simulate.change(form.query('input[name=hello]'));
      });
      it('calls the onChange callback', function() {
        expect(handleChangeSpy.called).to.equal(true);
      });
      it('Updates the property in the data', function() {
        expect(form.$element.find('input[name=hello]').val()).to.equal('moon');
      });
    });
    describe('and the form is submitted', function() {
      beforeEach(function() {
        form.query('input[name=hello]').value = 'moon';
        TestUtils.Simulate.change(form.query('input[name=hello]'));
        TestUtils.Simulate.submit(form.element);
      });
      it('calls the onValidSubmit callback', function() {
        expect(handleValidSubmitSpy.called).to.equal(true);
      });
    });
  });
  describe('Given a form with 2 fields and a validator function that makes the first input required', function() {
    let handleInvalidSubmitSpy;
    beforeEach(function() {
      handleChangeSpy = sinon.spy();
      handleValidSubmitSpy = sinon.spy();
      form = new RenderedTestComponent(<BasicForm initialData={{hello: 'world'}} onChange={handleChangeSpy} onValidSubmit={handleInvalidSubmitSpy} />);
    });
  });
});
