import BaseInput from './base_input.jsx'
import React, { Component, PropTypes } from 'react';
import { shallowEqual } from 'react-pure-render'

class Input extends BaseInput {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'number', 'date', 'datetime-local'])
  };

  static defaultProps = {
    type: 'text'
  };

  handleChange = (e) => {
    e.preventDefault();
    this.handleValueChange(this.refs.input.value);
  }

  render() {
    return (
      <div className='FieldWrapper'>
        <input
          ref='input'
          value={this.getFieldValue()}
          onChange={this.handleChange}
          {...this.props} />
        { this.showErrorMessage() ? <span style={{color: 'red'}} className='FieldWrapper-errorMessage'>{this.getErrorMessage()}</span> : null }
      </div>
    );
  }
}

export default Input;
