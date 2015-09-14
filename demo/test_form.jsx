import React, { Component, PropTypes } from 'react';
import Form from '../src/form.jsx';
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

  handleChange = (formData, inputName, newValue, oldValue) => console.log('CHANGE!', `${inputName}: '${oldValue}' => '${newValue}'`)

  render() {
    return (
      <Form initialData={{hello: 'a', foo: 'bar'}} validator={this.validateForm} onChange={this.handleChange} onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
        <Form.ErrorList baseOnly={true} />
        <Input type='text' label='Hello' name='hello' />
        <NestedFieldset />
        <button>Submit!</button>
      </Form>
    );
  }
}

export default TestForm;
