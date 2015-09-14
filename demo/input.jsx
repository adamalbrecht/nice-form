import wrapInput from '../src/wrap_input.jsx'
import React, { Component, PropTypes } from 'react';
import { shallowEqual } from 'react-pure-render'

class Input extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'number', 'date', 'datetime-local']),
    value: PropTypes.any,
    onValueChange: PropTypes.func.isRequired,
    valid: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    dirty: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    hasBlurred: PropTypes.bool.isRequired,
    formHasBeenSubmitted: PropTypes.bool.isRequired,
    formIsValid: PropTypes.bool.isRequired,
    formIsInvalid: PropTypes.bool.isRequired,
    formIsPristine: PropTypes.bool.isRequired,
    formIsDirty: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    type: 'text'
  };

  handleChange = (e) => {
    e.preventDefault();
    this.props.onValueChange(this.refs.input.value);
  }

  render() {
    return (
      <div className='FieldWrapper'>
        <label>{this.props.label}</label>
        <input
          ref='input'
          onChange={this.handleChange}
          {...this.props} />
        { (this.props.hasBlurred || this.props.formHasBeenSubmitted) ? <span style={{color: 'red'}} className='FieldWrapper-errorMessage'>{this.props.error}</span> : null }
      </div>
    );
  }
}

export default wrapInput(Input);
