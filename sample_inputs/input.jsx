import { wrapInput } from '../src'
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
    const val = this.refs.input.value.trim();
    this.props.onValueChange(val.length ? val : null);
  }

  render() {
    return (
      <div className='Field'>
        <label>{this.props.label}</label>
        <input
          ref='input'
          onChange={this.handleChange}
          {...this.props} />
        { this._showErrorMessage() ? <span className='Field-errorMessage'>{this.props.error}</span> : null }
      </div>
    );
  }

  _showErrorMessage() {
    return (this.props.hasBlurred || this.props.formHasBeenSubmitted);
  }
}

export default wrapInput(Input);
