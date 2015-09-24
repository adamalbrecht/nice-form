import React, { Component, PropTypes } from 'react';

class FormDataViewer extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    metadata: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className='FormDataViewer'>
        <strong>Form Data:</strong>
        <br/>
        <pre style={{backgroundColor: '#ddd', padding: 10}}>
          <code>{JSON.stringify(this.props.data, undefined, 2)}</code>
        </pre>
        <br/>
        <strong>Form Metadata:</strong>
        <br/>
        <pre style={{backgroundColor: '#ddd', padding: 10}}>
          <code>{JSON.stringify(this.props.metadata, undefined, 2)}</code>
        </pre>
      </div>
    );
  }
}

export default FormDataViewer;
