# React Form Helper

React Form Helper is a small form building library for React.js that helps to remove boilerplate and make it easy to validate your forms. It is inspired by [Redux-Form](https://github.com/erikras/redux-form), [Formsy-React](https://github.com/christianalfoni/formsy-react), and [Angular](https://angularjs.org/) 1.x forms.

## Status:

This library is still a work in progress and **not** ready for production use.

## Features:

* Does not provide any input components - you can use standard form fields or write your own more complex inputs. You can see some samples in the `sample_inputs` directory. They must, at a minimum, accept props for `value` and `onChange`. But quite a few more props are provided.
* Splits all state into 2 objects: Data and metadata. The data is what the result of your form will be, while metadata includes information on validity, dirtyness, initial values, etc.
* While you can certainly maintain the form state yourself by piecing together the provided functions, the easiest way is to use the provided `createForm` higher order component.
* Validate the form with a single function that returns an object of errors.

## Coming Soon:

* Ability to represent complex database structures
* Dynamically add/remove fields to the form
* Multiple validator functions
* Asynchronous validator functions

## Usage:

### Creating Inputs:

Inputs can be as simple or as complex as you'd like, but they must, at the minimum, accept props for `value` and `onChange`. While you can use basic form elements like `<input />` or `<select />`, you'll miss out on some of the nice metadata that is provided, such as error messages, dirty, status, etc.

```javascript
import React, { Component, PropTypes } from 'react';

class Input extends React.Component {
  static propTypes = {
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    formHasBeenSubmitted: PropTypes.bool.isRequired,
    hasBlurred: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['text', 'number', 'date', 'datetime-local']),
    valid: PropTypes.bool.isRequired,
    value: PropTypes.any
  }
  render() {
    return (
      <div className='Field'>
        { this.props.label ? <label for={this.props.name}>{this.props.label}</label> : null }
        <input ref='input' onChange={this.handleChange} {...this.props} />
        { !this.props.valid && <span className='error'>{this.props.error}</span> }
      </div>
    );
  }
}

export default Input;
```

This example is extremely simple, but you can do quite a bit more since you have access to all form data and metadata. See the `sample_inputs` directory for more complex samples. You will have a number of props at your disposal when creating your inputs. You can see a list of them [here](doc/input_props.md).

### Simple Example:

In this example, we create our form using the ES2016 decorator syntax. If your project does not support this, then you can wrap it like so: `createForm(UserProfilePage)(validator, initialData);`.

```javascript
import React, { Component, PropTypes } from 'react';
import { createForm } from 'react-form-helper';
import { Input, Textarea } from '../my_form_inputs';

function validator(data) {
  let errors = {};
  if (!data.username || !data.username.length) {
    errors.username = 'is required';
  }
  if (!data.password || !data.password.length) {
    errors.password = 'is required';
  } else if (data.password !== data.password_confirmation) {
    errors.password_confirmation = 'must match password';
  }
  return errors;
}

@createForm(validator, { /*... initial data - optional ... */ });
class UserProfilePage extends React.Component {
  static propTypes = {
    formData: PropTypes.object.isRequired,
    formMetadata: PropTypes.object.isRequired,
    getFieldProps: PropTypes.func.isRequired,
    markFormAsSubmitted: PropTypes.func.isRequired,
    resetFormData: PropTypes.func.isRequired
  }

  handleSubmit = (data) => {
    this.props.markFormAsSubmitted();
    if (this.props.formMetadata.valid) {
      MyAPI.send(this.props.formData);
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} { ...this.props.getFormProps() } >
        <Input {...this.props.getFieldProps('username') } label='Username' />
        <Input {...this.props.getFieldProps('password') } label='Password' />
        <Input {...this.props.getFieldProps('password_confirmation') } label='Password Confirmation' />
        <Textarea {...this.props.getFieldProps('biography') } label='Biography' />
        <button>Submit</button>
      </Form>
    );
  }
}
```

#### Props Provided by the createForm higher order component

| Prop                | Type     | Details                                                                  |
| ------------------- | -------- | ------------------------------------------------------------------------ |
| formData            | object   | Up-to-date form data                                                     |
| formMetadata        | object   | Metadata for the form (validity, dirtiness, etc)                         |
| getFieldProps       | function | Returns all necessary props for a field given the field name             |
| markFormAsSubmitted | function | Call this function the first time that the user tries to submit the form |
| resetFormData       | function | Reset the form back to the original state, or to the provided object.    |

#### Props Provided by the getFieldProps function

| Prop                 | Type     | Details                                                                                        |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------- |
| error                | any      | Error message for the current field                                                            |
| formHasBeenSubmitted | bool     | True if the use has attempted to submit the form                                               |
| hasBlurred           | bool     | Has the user 'blurred' (focused then un-focused) the current field                             |
| name                 | string   | Name of the field. Also used as the key in the form data object.                               |
| onBlur               | function | Call this upon the user blurring the field                                                     |
| onChange             | function | Call this on change with the latest value. Will still work with basic fields and event objects |
| pristine             | bool     | Reset the form back to the original state, or to the provided object.                          |
| valid                | function | True if the field does not have any errors (from the validator function)                       |
| value                | any      | Current value of field                                                                         |
