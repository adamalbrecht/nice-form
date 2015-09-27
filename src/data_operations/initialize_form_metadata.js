import { isBlank, areErrorsPresent } from '../util';
import { reduce } from 'lodash';
import initializeFieldMetadata from './initialize_field_metadata';

/**
 * Given a JSON object representing the initial data that
 * will populate a form, generate some initial metadata
 * for this form. Form metadata includes information about
 * fields being valid/invalid, dirty/pristine, etc
 *
 * @param {object} data The initial form data. This is most likely your model.
 * @param {function} validator (optional) The function that validates the form. Should return an object
 * with fieldnames as keys and error strings as values.
 * @return {object} The form metadata
 */
export default function initializeFormMetadata(data, validator=null) {
  const errors = validator ? validator(data) : {};
  const initialFieldMetadata = reduce(data, (result, value, name) => {
    result[name] = initializeFieldMetadata(value, {
      error: errors[name],
      valid: isBlank(errors[name]),
      invalid: !isBlank(errors[name]),
      initialValue: value
    });
    return result;
  }, {});

  let valid = !areErrorsPresent(errors);

  let initialMetadata = {
    valid: valid,
    invalid: !valid,
    pristine: true,
    dirty: false,
    formHasBeenSubmitted: false,
    errors: errors,
    fields: initialFieldMetadata
  };

  return initialMetadata;
}


