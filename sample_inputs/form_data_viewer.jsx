import React from 'react';
import { wrapFormHelper } from '../src';


function FormDataViewer({formData, formMetadata}) {
  return (
    <div className='FormDataViewer'>
      <div className='FormDataViewer-codeBlock'>
        <strong>Form Data:</strong>
        <br/>
        <pre>
          <code>{JSON.stringify(formData, undefined, 2)}</code>
        </pre>
      </div>
      <div className='FormDataViewer-codeBlock'>
        <strong>Form Metadata:</strong>
        <br/>
        <pre>
          <code>{JSON.stringify(formMetadata, undefined, 2)}</code>
        </pre>
      </div>
    </div>
  );
}

export default wrapFormHelper(FormDataViewer);
