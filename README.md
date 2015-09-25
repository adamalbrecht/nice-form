# Nice Form
#### Form library for React 0.14+

This is a lightweight form library for React.js. It is inspired by [Redux-Form](https://github.com/erikras/redux-form), [Formsy-React](https://github.com/christianalfoni/formsy-react), and [Angular](https://angularjs.org/) 1.x forms.

## Features:

* Does not provide any input components - you must write your own. You can see some samples in the `sample_inputs` directory.
* Ability to choose between maintaing state yourself or letting the form maintain it. This is similar to how react inputs can be "controlled" or "uncontrolled".
* Validate the form with a single function that returns an object of errors.
* If you choose to maintain state yourself, it is easy to store in Flux.

## Planned Features:

* Dynamically add/remove fields to the form
* Ability to represent complex database structures

## Usage

### Creating Inputs

Inputs can be as simple or as complex as you'd like, but they must, at the minimum, accept props for `value` and `onChange` and then you need to wrap them using Nice Form's `createInput` higher order component function. Here is a simple example:

```javascript
import React from 'react';
import { createInput } from 'nice-form';

class BasicInput extends React.Component {
  handleChange = (e) => {
    e.preventDefault();
    this.props.onValueChange(this.refs.input.value.trim());
  }
  render() {
    return (
      <input ref='input' onChange={this.handleChange} {...this.props} />
    );
  }
}

export default createInput(BasicInput);
```

This example is extremely simple, but you can do quite a bit more since you have access to all form data and metadata. See the `sample_inputs` directory for more complex samples.

### Stateful Form

In this example, we'll let the form maintain state for us. We just need to provide initial data and a function to handle submission.

```javascript
import React from 'react';
import { StatefulForm as Form } from 'nice-form';
import { Input, Textarea } from '../my_form_inputs';

class UserProfilePage extends React.Component {
  handleSubmit = (data) => {
    // ...
  }

  validate = (data) => {
    let errors = {};
    if (!data.username) {
      errors.username = 'is required';
    }
    if (!data.password) {
      errors.password = 'is required';
    }
    if (data.password !== data.password_confirmation) {
      errors.password_confirmation = 'must match password';
    }
    return errors;
  }

  render() {
    return (
      <Form initialData={this.props.user} validator={this.validate} onValidSubmit={this.handleSubmit}>
        <Input type='text' name='username' label='Username' />
        <Input type='text' name='password' label='Password' />
        <Input type='text' name='password_confirmation' label='Password Confirmation' />
        <Textarea name='biography' label='Biography' />
      </Form>
    );
  }
}
```

### Dynamically Structured Form

```javascript
import React from 'react';
import { map } from 'lodash';
import { StatelessForm as Form, initializeFormMetadata } from 'nice-form';
import { Input, Textarea } from '../my_form_inputs';

class MyDynamicFormPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: props.user,
      formMetadata: initializeFormMetadata(props.user)
    }
  }

  handleSubmit = (data) => {
    // ...
  }

  handleChange = (data, metadata, action) => {
    this.setState({
      formData: data,
      formMetadata: metadata
    });
  }

  addTag = (e) => {
    e.preventDefault();
    let updatedFormData = this.state.formData;
    updatedFormData.tags.push('New Tag');
    this.setState({
      formData: updatedFormData
    });
  }

  render() {
    return (
      <Form initialData={this.props.user} validator={this.validate} onValidSubmit={this.handleSubmit}>
        <Input type='text' name='username' label='Username' />
        { map(this.props.data.tags, (tag, index) => <Input type='text' name={`tags.${index}`} />) }
        <a href='#' onClick={this.addTag}>Add Tag</a>
      </Form>
    );
  }
}
```

