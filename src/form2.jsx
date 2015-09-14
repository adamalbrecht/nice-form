import React, { Component, PropTypes } from 'react';
import { reduce, cloneDeep, some, without, includes, isArray, map, flatten } from 'lodash';
import FormErrorList from './form_errors.jsx';
import isBlank from './util/is_blank';

class Form2 extends Component {
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
    validator: (data) => { return {}; }
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // Call onChange with updated metadata
    const errors = this.props.validator(this.props.data);
    const initialFieldMetaData = reduce(this.props.data, (result, value, name) => {
      result[name] = {
        error: errors[name],
        valid: isBlank(errors[name]),
        invalid: !isBlank(errors[name]),
        pristine: true,
        dirty: false,
        hasBlurred: false,
        initialValue: value,
        currentValue: value
      };
      return result;
    }, {});

    let initialMetaData = {
      valid: true,
      invalid: false,
      pristine: true,
      dirty: false,
      formHasBeenSubmitted: false,
      baseErrors: this._getBaseErrors(errors),
      fields: initialFieldMetaData,
      ...this.props.metadata
    };

    this.props.onChange(
      this.props.data,
      initialMetaData,
      'initialize',
      null
    );
  }

  getChildContext() {
    return {
      handleInputChange: this.handleChange,
      formIsValid: () => this.props.metadata.valid || true,
      formIsInvalid: () => this.props.metadata.invalid || false,
      formIsPristine: () => this.props.metadata.pristine || true,
      formIsDirty: () => this.props.metadata.dirty || false,
      formHasBeenSubmitted: () => this.props.formHasBeenSubmitted || false,
      getFieldValue: (name) => this.props.data[name],
      getFieldError: (name) => this._getFieldMetaData(name, 'error') || null,
      fieldIsValid: (name) => this._getFieldMetaData(name, 'valid') || true,
      fieldIsInvalid: (name) => this._getFieldMetaData(name, 'invalid') || false,
      fieldIsPristine: (name) => this._getFieldMetaData(name, 'pristine') || true,
      fieldIsDirty: (name) => this._getFieldMetaData(name, 'dirty') || false,
      handleInputBlur: (name) => this.handleInputBlur(name),
      fieldHasBlurred: (name) => this._getFieldMetaData(name, 'hasBlurred') || false
    }
  }

  handleChange = (inputName, value) => {
    // Update data
    const updatedFormData = { ...this.props.data, [inputName]: value }

    // Run validation
    const errors = this.props.validator(updatedFormData);

    // Update field-level meta data
    let updatedMetaData = {
      ...this.props.metadata,
      baseErrors: this._getBaseErrors(errors),
      fields: {
        ...this.props.metadata.fields,
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

  handleInputBlur = (inputName) => {
    let updatedFieldMetadata = this.props.metadata.fields ? { ...this.props.metadata.fields[inputName] } : {};
    updatedFieldMetadata.hasBlurred = true;
    this.props.onChange(
      this.props.data,
      { ...this.props.metadata, fields: { ...this.props.metadata.fields, [inputName]: updatedFieldMetadata } },
      'input/blur',
      inputName
    );
  }

  render() {
    return(
      <form noValidate>
        <strong>Form Data:</strong>
        <br/>
        <pre style={{backgroundColor: '#ddd', padding: 10}}>
          <code>{JSON.stringify(this.props.data, undefined, 2)}</code>
        </pre>
        <br/>
        <strong>Form Meta Data:</strong>
        <br/>
        <pre style={{backgroundColor: '#ddd', padding: 10}}>
          <code>{JSON.stringify(this.props.metadata, undefined, 2)}</code>
        </pre>
        {this.props.children}
      </form>
    );
  }

  _getUpdatedFieldMetaData(inputName, value, error=null, hasBlurred=false) {
    let fieldMetaData = this.props.metadata.fields ? { ...this.props.metadata.fields[inputName] } : {};
    fieldMetaData.currentValue = value;
    fieldMetaData.pristine = (fieldMetaData.currentValue === fieldMetaData.initialValue);
    fieldMetaData.dirty = !fieldMetaData.pristine;
    fieldMetaData.error = error;
    fieldMetaData.valid = isBlank(error)
    fieldMetaData.invalid = !fieldMetaData.valid;
    return fieldMetaData;
  }

  _getFieldMetaData(inputName, metadataField) {
    return this.props.metadata[inputName] ? this.props.metadata[inputName][metadataField] : null;
  }

  _getBaseErrors(errors={}) {
    if (isBlank(errors.base)) {
      return [];
    } else if (isArray(errors.base)) {
      return errors.base;
    } else {
      return [errors.base];
    }
  }
}

export default Form2;
