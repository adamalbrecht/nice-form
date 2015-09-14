import React from 'react';
import Form from '../form.jsx';
import createComponent from './create_component';

class FakeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formState: {}
    };
  }
  render() {
    return <form>Hello!</form>;
  }
}

describe('Form', function() {
  it('renders a form element', function() {
    const component = createComponent(FakeForm, { initialData: { hello: 'world' }, validator: (data) => { return {}; }, onValidSubmit: (data) => { null }}, 'Child Content!');
    expect(component.type).to.equal('form');
  });
});
