import { isBlank } from '../util';
import { some } from 'lodash';

/**
 * Given the existing metadata and the name of an input
 * that was just changed, update and return the metadata
 * to reflect the change.
 *
 * @param {object} metadata The form metadata.
 * @param {string} inputName The field that was changed
 * @param {*} newValue The new value of the field
 * @return {object} The updated form metadata
 */
export default function applyChangeToFormMetadata(currentMetadata, inputName, newValue, errors) {
  // Run validation

  // Update field-level meta data
  let fieldMetadata = currentMetadata.fields ? { ...currentMetadata.fields[inputName] } : {};
  fieldMetadata.currentValue = newValue;
  fieldMetadata.pristine = (fieldMetadata.currentValue === fieldMetadata.initialValue);
  fieldMetadata.dirty = !fieldMetadata.pristine;
  fieldMetadata.error = errors[inputName];
  fieldMetadata.valid = isBlank(fieldMetadata.error)
  fieldMetadata.invalid = !fieldMetadata.valid;

  // Initialize form-level meta data with updated field level meta data
  let updatedMetadata = {
    ...currentMetadata,
    errors: errors,
    fields: {
      ...currentMetadata.fields,
      [inputName]: fieldMetadata
    }
  };

  // Update form-level meta data
  updatedMetadata.valid = isBlank(errors);
  updatedMetadata.invalid = !updatedMetadata.valid;
  updatedMetadata.dirty = some(updatedMetadata.fields, f => f.dirty);
  updatedMetadata.pristine = !updatedMetadata.dirty;

  return updatedMetadata;
}
