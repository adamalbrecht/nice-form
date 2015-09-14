import React, { Component, PropTypes } from 'react';
import Form from '../src/form2.jsx';
import Input from './input.jsx';
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

class TestForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formData: {
        hello: 'world',
        foo: null
      },
      formMetadata: {}
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
      <Form
        data={this.state.formData}
        metadata={this.state.formMetadata}
        validator={this.validateForm}
        onChange={this.handleChange}
        onValidSubmit={this.handleValidSubmit}
        onInvalidSubmit={this.handleInvalidSubmit} >

        <Input type='text' label='Hello' name='hello' />
        <NestedFieldset />
        <button>Submit!</button>
        
      </Form>
    );
  }
}

export default TestForm;
