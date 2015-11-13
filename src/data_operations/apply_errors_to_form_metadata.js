import mapValues from 'lodash/object/mapValues';
import { areErrorsPresent, isBlank } from '../util';

/**
 * Given the existing metadata and an object with the
 * names and error messages of fields in the form,
 * update the metadata to reflect the errors.
 *
 * @param {object} metadata The form metadata.
 * @param {object} errors Object containing error messages, where the keys are the input names and the values are the errors.
 * @return {object} The updated form metadata
 */
export default function applyErrorsToFormMetadata(currentMetadata, errors) {
  let updatedMetadata = {
    ...currentMetadata,
    valid: !areErrorsPresent(errors),
    invalid: areErrorsPresent(errors),
    fields: mapValues(currentMetadata.fields, (fieldMetadata, name) => {
      let valid = isBlank(errors[name]);
      return {
        ...fieldMetadata,
        valid: valid,
        invalid: !valid,
        error: errors[name]
      };
    }),
    errors: errors
  };
  return updatedMetadata;
}
