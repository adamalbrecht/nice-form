import React, { Component, PropTypes } from 'react';

class Select extends Component {
  static propTypes = {
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    formHasBeenSubmitted: PropTypes.bool.isRequired,
    hasBlurred: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['text', 'number', 'date', 'datetime-local']),
    valid: PropTypes.bool.isRequired,
    value: PropTypes.any
  };

  handleChange = (e) => {
    e.preventDefault();
    const val = this.refs.input.value;
    this.props.onChange(val.length ? val : null);
  }

  render() {
    return (
      <div className='Field'>
        <label>{this.props.label}</label>
        <select
          ref='input'
          onChange={this.handleChange}
          { ...this.props }>
          { this.props.children }
        </select>
        { this._showErrorMessage() ? <span className='Field-errorMessage'>{this.props.error}</span> : null }
      </div>
    );
  }

  _showErrorMessage() {
    return (!this.props.valid && (this.props.hasBlurred || this.props.formHasBeenSubmitted));
  }
}

export default Select;
