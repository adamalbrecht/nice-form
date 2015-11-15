import React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {
  applyChangeToFormData,
  applyChangeToFormMetadata,
  applyErrorsToFormMetadata,
  applyBlurToFormMetadata,
  initializeFormMetadata
} from './data_operations';

export default function createForm(validator, initialData={}) {
  return function(WrappedComponent) {
    class FormComponent extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          formData: initialData,
          formMetadata: initializeFormMetadata(initialData, validator)
        };
      }

      resetFormData = (data) => {
        if ((data === undefined) || (data === null)) {
          data = initialData;
        }
        this.setState({
          formData: data,
          formMetadata: initializeFormMetadata(data, validator)
        });
      }

      handleChange = (inputName, param) => {
        const updatedValue = ((typeof(param) === 'object') && param.currentTarget) ? param.currentTarget.value : param;
        const updatedData = applyChangeToFormData(this.state.formData, inputName, updatedValue);
        const errors = validator(updatedData);
        const updatedMetadata = applyErrorsToFormMetadata(
          applyChangeToFormMetadata(this.state.formMetadata, inputName, updatedValue),
        errors);

        this.setState({
          formData: updatedData,
          formMetadata: updatedMetadata
        });
      }

      handleBlur = (inputName) => {
        this.setState({
          formMetadata: applyBlurToFormMetadata(this.state.formMetadata, inputName)
        });
      }

      markFormAsSubmitted = () => {
        this.setState({
          formMetadata: { ...this.state.formMetadata, formHasBeenSubmitted: true }
        });
      }

      getFieldProps = (inputName) => {
        const md = this.state.formMetadata;
        const fmd = (md && md.fields && md.fields[inputName]) ? md.fields[inputName] : {};
        return {
          name: inputName,
          onChange: (val) => this.handleChange(inputName, val),
          onBlur: () => this.handleBlur(inputName),
          value: this.state.formData[inputName] || null,
          valid: (fmd.valid !== null) ? fmd.valid : true,
          pristine: (fmd.valid !== null) ? fmd.pristine : true,
          error: fmd.error,
          hasBlurred: fmd.hasBlurred || false,
          formHasBeenSubmitted: md.formHasBeenSubmitted || false
        };
      }

      getFormProps = () => {
        return {
          formData: this.state.formData,
          formMetadata: this.state.formMetadata,
          markFormAsSubmitted: this.markFormAsSubmitted
        };
      }

      render() {
        return (
          <WrappedComponent
            {...this.props}
            resetFormData={this.resetFormData}
            formData={this.state.formData}
            formMetadata={this.state.formMetadata}
            markFormAsSubmitted={this.markFormAsSubmitted}
            getFormProps={this.getFormProps}
            getFieldProps={this.getFieldProps} />
        );
      }
    }
    return hoistStatics(FormComponent, WrappedComponent);
  };
}
