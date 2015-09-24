import React, { Component, PropTypes } from 'react';
import wrapInput from '../wrap_input.jsx';

class BasicInput extends Component {
  handleChange = (e) => {
    this.props.onValueChange(this.refs.input.value);
  }
  render() {
    return <input {...this.props} ref='input' onChange={this.handleChange} />;
  }
}

export default wrapInput(BasicInput);
