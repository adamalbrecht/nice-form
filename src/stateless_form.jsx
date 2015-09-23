import React, { Component, PropTypes } from 'react';
import { reduce, cloneDeep, some, without, includes, isArray, map, flatten } from 'lodash';
import FormErrorList from './form_errors.jsx';
import isBlank from './util/is_blank';
import {
  applyChangeToFormData,
  applyChangeToFormMetadata,
  applyBlurToFormMetadata
} from './form_data_reducers';

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
    handleInputChange: PropTypes.func,
    formIsValid: PropTypes.func,
    formIsInvalid: PropTypes.func,
    formIsPristine: PropTypes.func,
    formIsDirty: PropTypes.func,
    formHasBeenSubmitted: PropTypes.func,
    getBaseErrors: PropTypes.func,
    getFieldValue: PropTypes.func,
    getFieldError: PropTypes.func,
    fieldIsValid: PropTypes.func,
    fieldIsInvalid: PropTypes.func,
    fieldIsPristine: PropTypes.func,
    fieldIsDirty: PropTypes.func,
    handleInputBlur: PropTypes.func,
    fieldHasBlurred: PropTypes.func
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
      handleInputChange: this.handleChange,
      formIsValid: () => this.props.metadata.valid || true,
      formIsInvalid: () => this.props.metadata.invalid || false,
      formIsPristine: () => this.props.metadata.pristine || true,
      formIsDirty: () => this.props.metadata.dirty || false,
      formHasBeenSubmitted: () => this.props.metadata.formHasBeenSubmitted || false,
      getFieldValue: (name) => this.props.data[name],
      getFieldError: (name) => this._getFieldMetadata(name, 'error') || null,
      fieldIsValid: (name) => this._getFieldMetadata(name, 'valid') || true,
      fieldIsInvalid: (name) => this._getFieldMetadata(name, 'invalid') || false,
      fieldIsPristine: (name) => this._getFieldMetadata(name, 'pristine') || true,
      fieldIsDirty: (name) => this._getFieldMetadata(name, 'dirty') || false,
      handleInputBlur: (name) => this.handleInputBlur(name),
      fieldHasBlurred: (name) => this._getFieldMetadata(name, 'hasBlurred') || false
    }
  }

  handleChange = (inputName, value) => {
    const updatedData = applyChangeToFormData(this.props.data, inputName, value);
    const errors = this.props.validator(updatedData);
    this.props.onChange(
      updatedData,
      applyChangeToFormMetadata(this.props.metadata, inputName, value, errors),
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
      <form noValidate={this.props.noValidate} onSubmit={this.handleSubmit}>
        <strong>Form Data:</strong>
        <br/>
        <pre style={{backgroundColor: '#ddd', padding: 10}}>
          <code>{JSON.stringify(this.props.data, undefined, 2)}</code>
        </pre>
        <br/>
        <strong>Form Metadata:</strong>
        <br/>
        <pre style={{backgroundColor: '#ddd', padding: 10}}>
          <code>{JSON.stringify(this.props.metadata, undefined, 2)}</code>
        </pre>
        {this.props.children}
      </form>
    );
  }

  _getFieldMetadata(inputName, metadataField) {
    return (this.props.metadata.fields && this.props.metadata.fields[inputName]) ? this.props.metadata.fields[inputName][metadataField] : null;
  }

}

export default StatelessForm;
