import 'normalize.css/normalize.css';
import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';

import DemoStatelessForm from './demo_stateless_form.jsx';

class App extends React.Component {
  render() {
    return (
      <div style={{maxWidth: 900, margin: '0 auto'}}>
        <h3>React 0.14 Form Library Demo</h3>
        <DemoStatelessForm />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('OuterContainer'));
