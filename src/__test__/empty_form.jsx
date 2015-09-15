import React, { Component, PropTypes } from 'react';
import { Form, initializeFormMetadata } from '..';

class EmptyForm extends Component {
  constructor(props) {
    super(props);
    const initialData = {};
    this.state = {
      formData: initialData,
      formMetadata: initializeFormMetadata(initialData)
    };
  }
  handleChange = (d, md, a) => {
    this.setState({formData: d, formMetadata: md});
  }

  handleValidSubmit = (data) => {
    console.log('submit');
  }
  render() {
    return (
      <Form data={this.state.formData} metadata={this.state.formMetadata} onChange={this.handleChange} onValidSubmit={this.handleValidSubmit}>
      </Form>
    );
  }
}

export default EmptyForm;
