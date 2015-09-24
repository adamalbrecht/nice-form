import { isBlank, areErrorsPresent } from '../util';
import { reduce } from 'lodash';

/**
 * Given a JSON object representing the initial data that
 * will populate a form, generate some initial metadata
 * for this form. Form metadata includes information about
 * fields being valid/invalid, dirty/pristine, etc
 *
 * @param {object} data The initial form data. This is most likely your model.
 * @return {object} The form metadata
 */
export default function initializeFormMetadata(data, validator=null) {
  const errors = validator ? validator(data) : {};
  const initialFieldMetadata = reduce(data, (result, value, name) => {
    result[name] = {
      error: errors[name],
      valid: isBlank(errors[name]),
      invalid: !isBlank(errors[name]),
      pristine: true,
      dirty: false,
      hasBlurred: false,
      initialValue: value,
      currentValue: value
    };
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


