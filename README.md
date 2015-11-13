# Nice Form: Dead Simple Form Builder for React 0.14+ (WIP)

Nice Form is a form builder for React.js with a dead-simple API. It is inspired by [Redux-Form](https://github.com/erikras/redux-form), [Formsy-React](https://github.com/christianalfoni/formsy-react), and [Angular](https://angularjs.org/) 1.x forms.

## Status:

This library is still a work in progress and **not** ready for production use.

## Features:

* Does not provide any input components - you must write your own. You can see some samples in the `sample_inputs` directory.
* Splits all state into 2 objects: Data and metadata. The data is what the result of your form will be, while metadata includes information on validity, dirtyness, initial values, etc.
* Ability to choose between maintaing the state yourself or letting the form maintain it. This is similar to how react inputs can be "controlled" or "uncontrolled". If you choose to maintain the state yourself, it is easy to store your form data in a Flux store.
* Set the value and change handler of your input by just setting the `name` property
* Validate the form with a single function that returns an object of errors.
* Inputs don't have to be direct children of the form - they can be deeply nested in child components.

## Coming Soon:

* Ability to represent complex database structures
* Dynamically add/remove fields to the form
* Multiple validator functions
* Asynchronous validator functions

## Usage:

### Creating Inputs:

Inputs can be as simple or as complex as you'd like, but they must, at the minimum, accept props for `value` and `onChange` and then you need to wrap them using Nice Form's `wrapInput` higher order component function. Here is a simple example:

```javascript
import React from 'react';
import { wrapInput } from 'nice-form';

class Input extends React.Component {
  handleChange = (e) => {
    e.preventDefault();
    this.props.onValueChange(this.refs.input.value);
  }
  render() {
    return (
      <div className='Field'>
        { this.props.label ? <label for={this.props.name}>{this.props.label}</label> : null }
        <input ref='input' onChange={this.handleChange} {...this.props} />
      </div>
    );
  }
}

export default wrapInput(Input);
```

This example is extremely simple, but you can do quite a bit more since you have access to all form data and metadata. See the `sample_inputs` directory for more complex samples. You will have a number of props at your disposal when creating your inputs. You can see a list of them [here](doc/input_props.md).

### Simple Example:

In this example, we'll let the form maintain state for us by importing the `StatefulForm` component. We just need to provide initial data and a function to handle submission.

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

  render() {
    return (
      <Form initialData={this.props.user} validator={this.validate} onValidSubmit={this.handleSubmit}>
        <Input type='text' name='username' label='Username' />
        <Input type='text' name='password' label='Password' />
        <Input type='text' name='password_confirmation' label='Password Confirmation' />
        <Textarea name='biography' label='Biography' />
        <button>Submit</button>
      </Form>
    );
  }
}
```


### Maintain State in Parent Component:

Next, we'll take our example above and give ourselves more fine-grained control by maintaining the state in our parent component. Note that we're importing `StatelessForm` this time, as well as the `initializeFormMetadata` function. We'll also need to setup our initial state in the constructor, add a change handler function, and change some of the form's props.

```javascript
import React from 'react';
import { StatelessForm as Form, initializeFormMetadata } from 'nice-form';
import { Input, Textarea } from '../my_form_inputs';

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    const formData = { username: props.user.username, biography: props.user.biography };
    this.state = {
      data: formData,
      metadata: initializeFormMetadata(formData, this.validate)
    };
  }

  handleSubmit = (data) => {
    // ...
  }
  validate = (data) => {
    // same as above example...
  }

  handleChange = (data, metadata, action) => {
    this.setState({data: data, metadata: metadata});
  }

  render() {
    return (
      <Form
        data={this.state.data}
        metadata={this.state.metadata}
        validator={this.validate}
        onValidSubmit={this.handleSubmit}>

        <Input type='text' name='username' label='Username' />
        <Input type='text' name='password' label='Password' />
        <Input type='text' name='password_confirmation' label='Password Confirmation' />
        <Textarea name='biography' label='Biography' />
        <button>Submit</button>

      </Form>
    );
  }
}

```

Note that the above is almost exactly what the `StatefulForm` component does.

### Usage with Flux / Redux:

Example coming soon. It's already possible to do this manually since the onChange callback returns an "action" string that fits naturally as an action type, but I'd like to write some helper functions to make it less verbose. This will most likely be a separate library.


### Creating Non-Input Components:

If you want to create a component that isn't an input, but still needs access to the form data or metadata, you can use the `wrapFormHelper` function. An example of this would be an error list (although it is easy to put your errors inline next to your fields).

```javascript
import React from 'react';
import { wrapFormHelper } from 'nice-form';
import { isEmpty, map } from 'lodash';

// using new function react component syntax
function ErrorMessageList({data, metadata}) {
  if  (metadata && metadata.formHasBeenSubmitted && !isEmpty(metadata.errors)) {
    return (
      <ul className='ErrorMessageList'>
        { map(metadata.errors, (errMsg, errKey) => <li key={errKey}>{`${errKey} ${errMsg}`}</li>) }
      </ul>
    );
  }
}

export default wrapFormHelper(ErrorMessageList);

```

And then in your form:


```javascript
  // ...
  render() {
    return (
      <Form initialData={this.props.myData} onValidSubmit={this.handleSubmit}>
        <ErrorMessageList />
        <Input type='text' name='foo' label='Foo' />
        <button>Submit</button>
      </Form>
    );
  }
```
