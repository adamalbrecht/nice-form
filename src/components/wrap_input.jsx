import React, { Component, PropTypes } from 'react';
import shallowEqual from 'react-pure-render/shallowEqual';
import isEmpty from 'lodash/lang/isEmpty';
import isEqual from 'lodash/lang/isEqual';
import { initializeFieldMetadata } from '../data_operations';

export default function wrapInput(InputComponent) {

  class FormInput extends Component {
    static propTypes = {
      name: PropTypes.string.isRequired
    }

    static contextTypes = {
      formData: PropTypes.object.isRequired,
      formMetadata: PropTypes.object.isRequired,
      handleInputBlur: PropTypes.func.isRequired,
      handleInputChange: PropTypes.func.isRequired
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
      const prevFieldMetadata = this.context.formMetadata.fields ? this.context.formMetadata.fields[this.props.name] : null;
      const nextFieldMetadata = nextContext.formMetadata.fields ? nextContext.formMetadata.fields[this.props.name] : null;
      return !shallowEqual(this.props, nextProps) ||
             !shallowEqual(this.state, nextState) ||
             !shallowEqual(this.context.formMetadata, nextContext.formMetadata) ||
             !isEqual(prevFieldMetadata, nextFieldMetadata);
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
      const data = this.context.formData;
      const metadata = this.context.formMetadata;
      if (metadata.fields[name] && isEmpty(metadata.fields[name])) {

      }
      const fieldMetadata = metadata.fields[name] || initializeFieldMetadata();
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
