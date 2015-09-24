import React, { Component, PropTypes } from 'react';
import { StatelessForm, initializeFormMetadata } from '../..';
import { cloneDeep } from 'lodash';
import BasicInput from './basic_input.jsx';

class BasicForm extends Component {
  static propTypes = {
    initialData: PropTypes.object,
    onChange: PropTypes.func
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

  handleChange(d, md, a) {
    this.setState({formData: d, formMetadata: md});
    if (this.props.onChange) {
      this.props.onChange(d, md);
    }
  }
  render() {
    return (
      <StatelessForm {...this.props} data={this.state.formData} metadata={this.state.formMetadata} onChange={this.handleChange.bind(this)}>
        <BasicInput name='hello' />
        <BasicInput name='foo' />
        <button>Submit</button>
      </StatelessForm>
    );
  }
}

export default BasicForm;
