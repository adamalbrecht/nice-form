import React, { Component, PropTypes } from 'react';
import { shallowEqual } from 'react-pure-render'

export default function wrapInput(InputComponent) {

  class FormInput extends Component {
    static propTypes = {
      name: PropTypes.string.isRequired
    }

    static contextTypes = {
      handleInputChange: PropTypes.func.isRequired,
      getFieldValue: PropTypes.func.isRequired,
      formIsValid: PropTypes.func.isRequired,
      formIsInvalid: PropTypes.func.isRequired,
      formIsPristine: PropTypes.func.isRequired,
      formIsDirty: PropTypes.func.isRequired,
      formHasBeenSubmitted: PropTypes.func.isRequired,
      getFieldError: PropTypes.func.isRequired,
      fieldIsValid: PropTypes.func.isRequired,
      fieldIsInvalid: PropTypes.func.isRequired,
      fieldIsDirty: PropTypes.func.isRequired,
      fieldIsPristine: PropTypes.func.isRequired,
      handleInputBlur: PropTypes.func.isRequired,
      fieldHasBlurred: PropTypes.func.isRequired
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
      return !shallowEqual(this.props, nextProps) ||
             !shallowEqual(this.state, nextState) ||
             !shallowEqual(this.context, nextContext) ||
             this.context.getFieldValue(this.props.name) !== this.getFieldValue(this.props.name)
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
      return (
        <InputComponent
          {...this.props}
          value={this.context.getFieldValue(this.props.name)}
          onValueChange={this.handleValueChange}
          valid={this.context.fieldIsValid(this.props.name)}
          invalid={!this.context.fieldIsValid(this.props.name)}
          pristine={this.context.fieldIsPristine(this.props.name)}
          dirty={!this.context.fieldIsPristine(this.props.name)}
          error={this.context.getFieldError(this.props.name)}
          onBlur={this.handleBlur}
          hasBlurred={!this.context.fieldHasBlurred(this.props.name)}
          formHasBeenSubmitted={this.context.formHasBeenSubmitted()}
          formIsValid={this.context.formIsValid()}
          formIsInvalid={!this.context.formIsValid()}
          formIsPristine={this.context.formIsPristine()}
          formIsDirty={!this.context.formIsPristine()} />
      );
    }
  }

  return FormInput;
}
