import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

/*
 * Form Component
 *
 * This is a simple form wrapper that adds some classes
 * to the <form> element and automatically calls
 * the markFormAsSubmitted method.
 */

class Form extends Component {
  static propTypes = {
    className: PropTypes.string,
    formData: PropTypes.object.isRequired,
    formMetadata: PropTypes.object.isRequired,
    markFormAsSubmitted: PropTypes.func.isRequired,
    onSubmit: PropTypes.func
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.markFormAsSubmitted();
    if (this.props.onSubmit) {
      this.props.onSubmit(
        this.props.formData,
        this.props.formMetadata
      );
    }
  }

  render() {
    const classes = classNames(
      'Form',
      this.props.className,
      { 'Form--invalid': this.props.formMetadata.invalid },
      { 'Form--dirty': this.props.formMetadata.dirty },
      { 'Form--hasBeenSubmitted': this.props.formMetadata.hasBeenSubmitted }
    );
    return (
      <form {...this.props}
        onSubmit={this.handleSubmit}
        className={classes}>
        { this.props.children }
      </form>
    );
  }
}

export default Form;
