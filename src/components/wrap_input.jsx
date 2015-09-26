import React, { Component, PropTypes } from 'react';
import { shallowEqual } from 'react-pure-render'

const defaultFieldMetadata = {
  valid: true,
  invalid: false,
  pristine: true,
  dirty: false,
  error: null,
  initialValue: null,
  currentValue: null,
  hasBlurred: false
};

export default function wrapInput(InputComponent) {

  class FormInput extends Component {
    static propTypes = {
      name: PropTypes.string.isRequired
    }

    static contextTypes = {
      getFormData: PropTypes.func.isRequired,
      getFormMetadata: PropTypes.func.isRequired,
      handleInputBlur: PropTypes.func.isRequired,
      handleInputChange: PropTypes.func.isRequired
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
      return !shallowEqual(this.props, nextProps) ||
             !shallowEqual(this.state, nextState) ||
             !shallowEqual(this.context, nextContext) ||
             this.context.getFormMetadata()[this.props.name] !== this.getFieldValue(this.props.name)
    }

    handleValueChange = (newVal) => {
      this.context.handleInputChange(this.props.name, newVal);
    }

    handleBlur = (e) => {
      this.context.handleInputBlur(this.props.name);
    }

    onComponentDidMount() {
      // Initialize
      this.context.initializeField(this.props.name)
    }

    constructor(props) {
      super(props);
    }

    render() {
      const name = this.props.name;
      const data = this.context.getFormData();
      const metadata = this.context.getFormMetadata();
      const fieldMetadata = metadata.fields[name] || defaultFieldMetadata;
      return (
        <InputComponent
          {...this.props}
          value={data[name]}
          onValueChange={this.handleValueChange}
          valid={fieldMetadata.valid}
          invalid={fieldMetadata.invalid}
          pristine={fieldMetadata.pristine}
          dirty={fieldMetadata.dirty}
          error={fieldMetadata.error}
          onBlur={this.handleBlur}
          hasBlurred={fieldMetadata.hasBlurred}
          formHasBeenSubmitted={metadata.formHasBeenSubmitted}
          formIsValid={metadata.valid}
          formIsInvalid={metadata.invalid}
          formIsPristine={metadata.pristine}
          formIsDirty={metadata.dirty} />
      );
    }
  }

  return FormInput;
}
