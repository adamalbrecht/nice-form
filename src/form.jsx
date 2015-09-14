import React, { Component, PropTypes } from 'react';
import { cloneDeep, isEmpty, some, without, includes, isArray, map, flatten } from 'lodash';
import FormErrorList from './form_errors.jsx';

class Form extends Component {
  static propTypes = {
    initialData: PropTypes.object.isRequired,
    validator: PropTypes.func,
    onInvalidSubmit: PropTypes.func,
    onValidSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func
  }
  static childContextTypes = {
    handleInputChange: PropTypes.func,
    getFormData: PropTypes.func,
    getFormErrors: PropTypes.func,
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
    fieldIsDirty: PropTypes.func
  };
  static defaultProps = {
    validator: (data) => { return {}; }
  };

  constructor(props) {
    super(props);
    const errors = this.props.validator(props.initialData);
    const valid = isEmpty(errors);
    this.state = {
      pristine: true,
      dirty: false,
      dirtyFields: [],
      errors: errors,
      valid: valid,
      invalid: !valid,
      hasBeenSubmitted: false
    };
  }

  componentWillMount() {
    this.setState({
      formData: cloneDeep(this.props.initialData)
    });
  }

  handleInputChange = (inputName, value) => {
    const oldValue = this.state.formData[inputName];
    const updatedFormData = { ...this.state.formData, [inputName]: value };
    const changed = (this.state.formData[inputName] !== value);
    const changedFromInitial = (this.props.initialData[inputName] !== value);
    const alreadyDirty = includes(this.state.dirtyFields, inputName);
    const errors = this.props.validator(updatedFormData);
    const valid = isEmpty(errors);
    let updatedDirtyFields;

    if (!alreadyDirty && changedFromInitial) {
      updatedDirtyFields = [ ...this.state.dirtyFields, inputName ];
    } else if (!changedFromInitial) {
      updatedDirtyFields = without(this.state.dirtyFields, inputName);
    } else {
      updatedDirtyFields = this.state.dirtyFields;
    }

    this.setState({
      formData: updatedFormData,
      dirtyFields: updatedDirtyFields,
      pristine: (updatedDirtyFields.length === 0),
      dirty: (updatedDirtyFields.length > 0),
      errors: errors,
      valid: valid,
      invalid: !valid
    });
    if (this.props.onChange) {
      this.props.onChange(updatedFormData, inputName, value, oldValue);
    }
  }

  getBaseErrors = () => {
    if (this.state.errors.base && isArray(this.state.errors.base)) {
      return this.state.errors.base;
    } else if (this.state.errors.base) {
      return [this.state.errors.base];
    } else {
      return [];
    }
  }

  getChildContext() {
    return {
      handleInputChange: this.handleInputChange,
      getFormData: () => this.state.formData,
      getFormErrors: () => this.state.errors,
      formIsValid: () => this.state.valid,
      formIsInvalid: () => this.state.invalid,
      formIsPristine: () => this.state.pristine,
      formIsDirty: () => this.state.dirty,
      formHasBeenSubmitted: () => this.state.hasBeenSubmitted,
      getBaseErrors: () => this.getBaseErrors(),
      getFieldValue: (name) => this.state.formData[name],
      getFieldError: (name) => this.state.errors[name],
      fieldIsValid: (name) => !this.state.errors[name],
      fieldIsInvalid: (name) => (this.state.errors[name] !== null),
      fieldIsPristine: (name) => !includes(this.state.dirtyFields, name),
      fieldIsDirty: (name) => includes(this.state.dirtyFields, name)
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { valid, formData, errors } = this.state;
    this.setState({hasBeenSubmitted: true});
    if (valid) {
      this.props.onValidSubmit(formData);
    } else if (this.props.onInvalidSubmit) {
      this.props.onInvalidSubmit(formData, errors);
    }
  }

  render() {
    return (
      <form noValidate onSubmit={this.handleSubmit}>
        <h4 style={{marginBottom: 0}}>Current Form State:</h4>
        <pre style={{backgroundColor: '#ddd', padding: 10, display: 'inline-block'}}>
          <code>{JSON.stringify(this.state, undefined, 2)}</code>
        </pre>
        {this.props.children}
      </form>
    );
  }
}


Form.ErrorList = FormErrorList;

export default Form;
