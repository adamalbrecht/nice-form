import React, { Component, PropTypes } from 'react';
import { cloneDeep, some, without, includes, isArray, map, flatten } from 'lodash';
import FormErrorList from './form_errors.jsx';
import isBlank from './util/is_blank';

class Form2 extends Component {
  static propTypes = {
    formData: PropTypes.object.isRequired,
    metaData: PropTypes.shape({
      valid: PropTypes.bool,
      invalid: PropTypes.bool,
      pristine: PropTypes.bool,
      dirty: PropTypes.bool,
      fields: PropTypes.objectOf(PropTypes.shape({
        error: PropTypes.oneOf(['string', PropTypes.arrayOf(PropTypes.string)]),
        valid: PropTypes.bool,
        invalid: PropTypes.bool,
        pristine: PropTypes.bool,
        dirty: PropTypes.bool,
        hasBlurred: PropTypes.bool,
        initialValue: PropTypes.any,
        currentValue: PropTypes.any
      }))
    }).isRequired,
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
    fieldHasBlurred: PropTypes.func
  };

  static defaultProps = {
    validator: (data) => { return {}; }
  };

  constructor(props) {
    super(props);
    this.state = {
      initialFormData: cloneDeep(props.formData)
    }
  }

  componentWillMount() {
    // Call onChange with updated metadata
    const errors = this.props.validator(this.props.formData);
    const initialFieldMetaData = map(this.props.formData, (value, name) => {
      return {
        error: errors[name],
        valid: isBlank(errors[name]),
        invalid: !isBlank(errors[name]),
        pristine: true,
        dirty: false,
        hasBlurred: false,
        initialValue: value,
        currentValue: value
      };
    });

    let initialMetaData = {
      valid: true,
      invalid: false,
      pristine: true,
      dirty: false,
      formHasBeenSubmitted: false,
      fields: initialFieldMetaData,
      ...this.props.metaData
    };

    this.props.onChange(
      this.props.formData,
      initialMetaData,
      'initialize',
      null
    );
  }

  getChildContext() {
    return {
      handleInputChange: this.handleInputChange,
      formIsValid: () => this.props.metaData.valid,
      formIsInvalid: () => this.props.metaData.invalid,
      formIsPristine: () => this.props.metaData.pristine,
      formIsDirty: () => this.props.metaData.dirty,
      formHasBeenSubmitted: () => this.props.formHasBeenSubmitted,
      getFieldValue: (name) => this.props.formData[name],
      getFieldError: (name) => this._getFieldMetaData(name, 'error'),
      fieldIsValid: (name) => this._getFieldMetaData(name, 'valid'),
      fieldIsInvalid: (name) => this._getFieldMetaData(name, 'invalid'),
      fieldIsPristine: (name) => this._getFieldMetaData(name, 'pristine'),
      fieldIsDirty: (name) => this._getFieldMetaData(name, 'dirty'),
      fieldHasBlurred: (name) => this._getFieldMetaData(name, 'hasBlurred')
    }
  }

  handleInputChange = (inputName, value) => {
    // Update formData
    const updatedFormData = { ...this.props.formData, [inputName]: value }

    // Run validation
    const errors = this.props.validator(updatedFormData);

    // Update field-level meta data
    let updatedMetaData = {
      ...this.props.metaData,
      fields: {
        [inputName]: this._getUpdatedFieldMetaData(inputName, value, errors[inputName])
      }
    };

    // Update form-level meta data
    updatedMetaData.valid = isBlank(errors);
    updatedMetaData.invalid = !updatedMetaData.valid;
    updatedMetaData.dirty = some(updatedMetaData.fields, f => f.dirty);
    updatedMetaData.pristine = !updatedMetaData.dirty;

    this.props.onChange(
      updatedFormData,
      updatedMetaData,
      'input/change',
      inputName
    );
  }

  render() {
    return(
      <form noValidate>{this.props.children}</form>
    );
  }

  _getUpdatedFieldMetaData(inputName, value, error) {
    let fieldMetaData = { ...this.props.metaData[inputName] };
    fieldMetaData.currentValue = value;
    fieldMetaData.pristine = (fieldMetaData.currentValue !== fieldMetaData.initialValue);
    fieldMetaData.dirty = !fieldMetaData.pristine;
    fieldMetaData.error = error;
    fieldMetaData.valid = isBlank(error)
    fieldMetaData.invalid = !fieldMetaData.valid;
    return fieldMetaData;
  }

  _getFieldMetaData(inputName, metaDataField) {
    return this.props.metaData[inputName] ? this.props.metaData[inputName][metaDataField] : null;
  }
}

export default Form2;
