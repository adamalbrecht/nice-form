import React, { Component, PropTypes } from 'react';
import { createForm } from '../src';
import { Input, Select } from '../sample_inputs';
import Form from './form.jsx';
import { isBlank } from '../src/util';


function validate(data) {
  let errors = {};
  if (isBlank(data.hello)) {
    errors.hello = 'required field';
  } else if (data.hello.length < 10) {
    errors.hello = 'must be at least 10 characters';
  }
  if (isBlank(data.foo)) {
    errors.foo = 'required field';
  }
  return errors;
}

@createForm(validate, { hello: 'world', foo: 'bar'})
class DemoBasicForm extends Component {
  static propTypes = {
    formData: PropTypes.object.isRequired,
    formMetadata: PropTypes.object.isRequired,
    getFieldProps: PropTypes.func.isRequired,
    getFormProps: PropTypes.func.isRequired,
    resetFormData: PropTypes.func.isRequired
  }

  handleSubmit = (formData, formMetadata) => {
    console.log('submit!', formData, formMetadata.valid);
  }

  render() {
    return (
      <div>
        <h1>Higher Order Component</h1>
        <Form onSubmit={this.handleSubmit} { ...this.props.getFormProps() } >
          <Input {...this.props.getFieldProps('hello') } label='Hello' />
          <Select {...this.props.getFieldProps('foo') } label='Foo'>
            <option value=''></option>
            <option value='bar'>bar</option>
            <option value='abc'>abc</option>
            <option value='zyx'>zyx</option>
          </Select>
          <p>
            <label>Simple Field</label>
            <input { ...this.props.getFieldProps('simple_field') } />
          </p>
          <button>Submit</button>
        </Form>
        <br/>
        <strong>Form Data:</strong>
        <pre><code>{ JSON.stringify(this.props.formData, null, 2) }</code></pre>
        <br/>
        <strong>Form Meta Data:</strong>
        <pre><code>{ JSON.stringify(this.props.formMetadata, null, 2) }</code></pre>
      </div>
    );
  }
}

export default DemoBasicForm;
