import React from 'react';
import { wrapFormHelper } from '../src';
import { map, isEmpty } from 'lodash';

function ErrorMessageList({formData, formMetadata}) {
  if (formMetadata && formMetadata.formHasBeenSubmitted && !isEmpty(formMetadata.errors)) {
    return (
      <div className='ErrorMessageList'>
        <h5 className='ErrorMessageList-title'>Form Errors:</h5>
        <ul>
          { map(formMetadata.errors, (errMsg, errKey) => {
            if (errKey === 'base') {
              return <li key={errKey}>{errMsg}</li>;
            } else {
              return <li key={errKey}>{`${errKey} ${errMsg}`}</li>;
            }
          }) }
        </ul>
      </div>
    );
  } else {
    return <span />;
  }
};

export default wrapFormHelper(ErrorMessageList);
