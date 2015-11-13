import React, { Component, PropTypes } from 'react';
import { StatelessForm as Form, initializeFormMetadata } from '../src';
import Input from '../sample_inputs/input.jsx';
import FormDataViewer from '../sample_inputs/form_data_viewer.jsx';
import ErrorMessageList from '../sample_inputs/error_message_list.jsx';
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
    const myModel = { hello: 'world', foo: 'bar' };
    this.state = {
      formData: myModel,
      formMetadata: initializeFormMetadata(myModel, this.validateForm),
      showDataViewer: false
    };
  }

  validateForm = (data) => {
    let errors = {};
    if (isBlank(data.hello)) {
      errors.hello = 'is required';
    } else if (data.hello.length <= 3) {
      errors.hello = 'must be at least 4 characters';
    } else if (data.hello === data.foo) {
      errors.base = 'Fields must not match';
    }
    return errors;
  }

  handleValidSubmit = (data) => {
    console.log('submitted valid data!', data);
    this.setState({results: data});
  }

  handleInvalidSubmit = (data, errors) => {
    console.log('submitted with errors!', errors);
  }

  handleChange = (updatedFormData, updatedMetadata, action, inputName) => {
    // console.log('change!', action, inputName);
    this.setState({
      formData: updatedFormData,
      formMetadata: updatedMetadata
    });
  }

  showDataViewer = (e) => {
    e.preventDefault();
    this.setState({showDataViewer: true});
  }

  render() {
    return (
      <div>
        <Form
          data={this.state.formData}
          metadata={this.state.formMetadata}
          validator={this.validateForm}
          onChange={this.handleChange}
          onValidSubmit={this.handleValidSubmit}
          onInvalidSubmit={this.handleInvalidSubmit} >

          { this.state.showDataViewer ? <FormDataViewer /> : null }
          { !this.state.showDataViewer ? <a href='#' style={{display: 'block', margin: '5px 0 10px', fontSize: 11, fontStyle: 'italic'}} onClick={this.showDataViewer}>Show Form Data & MetaData</a> : null }
          <ErrorMessageList />
          <Input type='text' label='Hello' name='hello' />
          <NestedFieldset />
          <button>Submit!</button>
        </Form>
        { this.renderResults() }
      </div>
    );
  }

  renderResults() {
    if (this.state.results) {
      return (
        <div style={{marginTop: 15}}>
          <h5>Form Submit Data:</h5>
          <pre><code>{JSON.stringify(this.state.results)}</code></pre>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default DemoStatelessForm;
