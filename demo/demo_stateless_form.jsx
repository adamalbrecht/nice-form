import React, { Component, PropTypes } from 'react';
import { StatelessForm, initializeFormMetadata } from '../src';
import Input from '../sample_inputs/input.jsx';
import isBlank from '../src/util/is_blank';

class NestedFieldset extends Component {
  render() {
    return (
      <fieldset>
        <Input type='text' label='Foo' name='foo' />
      </fieldset>
    );
  }
}

class DemoStatelessForm extends Component {

  constructor(props) {
    super(props);
    const myModel = { hello: 'world', foo: null };
    this.state = {
      formData: myModel,
      formMetadata: initializeFormMetadata(myModel, this.validateForm)
    };
  }

  validateForm = (data) => {
    let errors = {};
    if (isBlank(data.hello)) {
      errors.hello = 'Required';
    }
    if (isBlank(data.hello) && isBlank(data.foo)) {
      errors.base = 'You have several missing fields';
    }
    return errors;
  }

  handleValidSubmit = (data) => {
    console.log('submitted valid data!', data);
  }

  handleInvalidSubmit = (data, errors) => {
    console.log('submitted with errors!', errors);
  }

  handleChange = (updatedFormData, updatedMetadata, action, inputName) => {
    console.log('change!', action, inputName);
    this.setState({
      formData: updatedFormData,
      formMetadata: updatedMetadata
    });
  }

  render() {
    return (
      <StatelessForm
        data={this.state.formData}
        metadata={this.state.formMetadata}
        validator={this.validateForm}
        onChange={this.handleChange}
        onValidSubmit={this.handleValidSubmit}
        onInvalidSubmit={this.handleInvalidSubmit} >

        <Input type='text' label='Hello' name='hello' />
        <NestedFieldset />
        <button>Submit!</button>
        
      </StatelessForm>
    );
  }
}

export default DemoStatelessForm;
