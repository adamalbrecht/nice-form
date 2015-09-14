import React, { Component, PropTypes } from 'react';
import { map, flatten } from 'lodash';
import { humanize } from './util';

class FormErrors extends Component {
  static contextTypes = {
    formIsInvalid: PropTypes.func.isRequired,
    formHasBeenSubmitted: PropTypes.func.isRequired,
    getFormErrors: PropTypes.func.isRequired,
    getBaseErrors: PropTypes.func.isRequired
  };

  static propTypes = {
    baseOnly: PropTypes.bool,
    className: PropTypes.string
  };

  static defaultProps = {
    baseOnly: true,
    className: 'FormErrors'
  };

  render() {
    if (this.context.formIsInvalid() && this.context.formHasBeenSubmitted()) {
      return (
        <ul className={this.props.className}>
          { map(this._getErrorList(), (err, i) => <li key={i}>{err}</li>) }
        </ul>
      );
    } else {
      return null;
    }
  }

  _getErrorList() {
    if (this.props.baseOnly) {
      return this.context.getBaseErrors();
    } else {
      return flatten(map(this.context.getFormErrors(), (error, field) => {
        if (field === 'base') {
          return error;
        } else {
          return `${humanize(field)} ${error.toLowerCase()}`;
        }
      }));
    }
  }
}

export default FormErrors;
