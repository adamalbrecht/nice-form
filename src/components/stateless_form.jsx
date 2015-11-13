import React, { Component, PropTypes } from 'react';

import without from 'lodash/array/without';
import map from 'lodash/collection/map';
import reduce from 'lodash/collection/reduce';
import some from 'lodash/collection/some';
import isArray from 'lodash/lang/isArray';

import { isBlank } from '../util'

import {
  applyChangeToFormData,
  applyChangeToFormMetadata,
  applyErrorsToFormMetadata,
  applyBlurToFormMetadata
} from '../data_operations';

class StatelessForm extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    metadata: PropTypes.shape({
      valid: PropTypes.bool,
      invalid: PropTypes.bool,
      pristine: PropTypes.bool,
      dirty: PropTypes.bool,
      fields: PropTypes.objectOf(PropTypes.shape({
        error: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
        valid: PropTypes.bool,
        invalid: PropTypes.bool,
        pristine: PropTypes.bool,
        dirty: PropTypes.bool,
        hasBlurred: PropTypes.bool,
        initialValue: PropTypes.any,
        currentValue: PropTypes.any
      }))
    }).isRequired,
    noValidate: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onInvalidSubmit: PropTypes.func,
    onValidSubmit: PropTypes.func.isRequired,
    validator: PropTypes.func
  }

  static childContextTypes = {
    formData: PropTypes.object,
    formMetadata: PropTypes.object,
    handleInputBlur: PropTypes.func,
    handleInputChange: PropTypes.func
  };

  static defaultProps = {
    noValidate: true,
    validator: (data) => { return {}; }
  };

  constructor(props) {
    super(props);
  }

  getChildContext() {
    return {
      formData: this.props.data,
      formMetadata: this.props.metadata,
      handleInputBlur: (name) => this.handleInputBlur(name),
      handleInputChange: this.handleChange
    }
  }

  handleChange = (inputName, value) => {
    const updatedData = applyChangeToFormData(this.props.data, inputName, value);
    const errors = this.props.validator(updatedData);
    const updatedMetadata = applyErrorsToFormMetadata(
      applyChangeToFormMetadata(this.props.metadata, inputName, value),
    errors);
    this.props.onChange(
      updatedData,
      updatedMetadata,
      'input/change',
      inputName
    );
  }

  handleInputBlur = (inputName) => {
    this.props.onChange(
      this.props.data,
      applyBlurToFormMetadata(this.props.metadata, inputName),
      'input/blur',
      inputName
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onChange(
      this.props.data,
      { ...this.props.metadata, formHasBeenSubmitted: true },
      'form/submit',
      null
    );
    if (this.props.metadata.valid) {
      this.props.onValidSubmit(this.props.data);
    } else if (this.props.onInvalidSubmit) {
      this.props.onInvalidSubmit(this.props.data, this.props.validator(this.props.data));
    }
  }

  render() {
    return(
      <form noValidate={this.props.noValidate} onSubmit={this.handleSubmit} children={this.props.children} />
    );
  }

}

export default StatelessForm;
