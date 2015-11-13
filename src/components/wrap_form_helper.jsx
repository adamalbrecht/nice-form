import React, { Component, PropTypes } from 'react';
import shallowEqual from 'react-pure-render/shallowEqual'
import isEqual from 'lodash/lang/isEqual';

/*
 * This higher order component is used for any
 * component that needs access to your form's data
 * and metadata, but isn't necessarily an input.
 */

export default function wrapFormHelper(ChildComponent) {
  class FormHelper extends Component {
    static contextTypes = {
      formData: PropTypes.object.isRequired,
      formMetadata: PropTypes.object.isRequired
    }

    constructor(props) {
      super(props);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
      return !shallowEqual(this.props, nextProps) ||
             !shallowEqual(this.state, nextState) ||
             !isEqual(this.context.formData, nextContext.formData) ||
             !isEqual(this.context.formMetadata, nextContext.formMetadata);
    }

    render() {
      return (
        <ChildComponent {...this.props} formData={this.context.formData} formMetadata={this.context.formMetadata} />
      );
    }

  }

  return FormHelper;
}
