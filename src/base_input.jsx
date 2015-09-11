import React, { Component, PropTypes } from 'react';
import { shallowEqual } from 'react-pure-render'

class BaseInput extends Component {
  static contextTypes = {
    handleInputChange: PropTypes.func.isRequired,
    getFieldValue: PropTypes.func.isRequired,
    getFormData: PropTypes.func.isRequired,
    formIsValid: PropTypes.func.isRequired,
    formIsInvalid: PropTypes.func.isRequired,
    formIsPristine: PropTypes.func.isRequired,
    formIsDirty: PropTypes.func.isRequired,
    formHasBeenSubmitted: PropTypes.func.isRequired,
    getFormErrors: PropTypes.func.isRequired,
    getFieldError: PropTypes.func.isRequired,
    fieldIsValid: PropTypes.func.isRequired,
    fieldIsInvalid: PropTypes.func.isRequired,
    fieldIsDirty: PropTypes.func.isRequired,
    fieldIsPristine: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState) ||
           !shallowEqual(this.context, nextContext) ||
           this.context.getFieldValue() !== this.getFieldValue()
  }

  getFieldValue = () => this.context.getFieldValue(this.props.name)
  getFormData = () => this.context.getFormData()
  isValid = () => this.context.fieldIsValid(this.props.name)
  isInvalid = () => this.context.fieldIsInvalid(this.props.name)
  formIsValid = () => this.context.formIsValid()
  formIsInvalid = () => this.context.formIsInvalid()
  formIsPristine = () => this.context.formIsPristine()
  formHasBeenSubmitted = () => this.context.formHasBeenSubmitted()
  fieldIsInvalid = () => this.context.fieldIsInvalid(this.props.name)
  fieldIsDirty = () => this.context.fieldIsDirty(this.props.name)
  fieldIsPristine = () => this.context.fieldIsPristine(this.props.name)
  getFormErrors = () => this.context.getFormErrors()
  getErrorMessage = () => this.context.getFieldError(this.props.name)

  showErrorMessage = () => ((this.formHasBeenSubmitted() || this.fieldIsDirty()) && this.isInvalid())

  handleValueChange = (newVal) => {
    this.context.handleInputChange(this.props.name, newVal);
  }

}

export default BaseInput;
