import 'normalize.css/normalize.css';
import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';

import TestForm from './test_form.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <h3>React 0.14 Form Test</h3>
        <TestForm />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('OuterContainer'));
