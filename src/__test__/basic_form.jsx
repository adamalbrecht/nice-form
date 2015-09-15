import React, { Component, PropTypes } from 'react';
import { Form, initializeFormMetadata } from '..';
import { cloneDeep } from 'lodash';
import BasicInput from './basic_input.jsx';

class BasicForm extends Component {
  static propTypes = {
    initialData: PropTypes.object
  }
  static defaultProps = {
    initialData: { hello: 'world' }
  };
  constructor(props) {
    super(props);
    const initialData = cloneDeep(props.initialData);
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
        <BasicInput name='hello' />
        <BasicInput name='foo' />
        <button>Submit</button>
      </Form>
    );
  }
}

export default BasicForm;
