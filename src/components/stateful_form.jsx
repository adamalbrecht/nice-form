import React, { Component, PropTypes } from 'react';
import { StatelessForm } from './stateless_form.jsx';
import { initializeFormMetadata } from '../data_operations';

import { cloneDeep } from 'lodash';

class StatefulForm extends Component {
  static propTypes = {
    initialData: PropTypes.object.isRequired,
    onInvalidSubmit: PropTypes.func,
    onValidSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const initialData = cloneDeep(props.initialData);
    this.state = {
      formData: initialData,
      formMetadata: initializeFormMetadata(initialData)
    };
  }

  handleChange(data, metadata, action) {
    this.setState({formData: data, formMetadata: metadata});
  }

  render() {
    return (
      <StatelessForm
        data={this.state.formData}
        metadata={this.state.formMetadata}
        onChange={this.handleChange.bind(this)}
        onValidSubmit={this.props.handleValidSubmit}
        onInvalidSubmit={this.props.onInvalidSubmit}
        children={this.props.children} />
    );
  }
}

export default StatefulForm;
