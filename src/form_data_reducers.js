import isBlank from './util/is_blank';
import { some, reduce } from 'lodash';

export function applyChangeToFormData(currentData, inputName, newValue) {
  return { ...currentData, [inputName]: newValue }
}

export function applyChangeToFormMetadata(currentMetadata, inputName, newValue, errors) {
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

export function initializeFormMetadata(data, metadata, errors) {
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

  let initialMetadata = {
    valid: true,
    invalid: false,
    pristine: true,
    dirty: false,
    formHasBeenSubmitted: false,
    errors: errors,
    fields: initialFieldMetadata,
    ...metadata
  };

  return initialMetadata;
}

export function applyBlurToFormMetadata(metadata, inputName) {
  let updatedFieldMetadata = metadata.fields ? { ...metadata.fields[inputName] } : {};
  updatedFieldMetadata.hasBlurred = true;
  return { ...metadata, fields: { ...metadata.fields, [inputName]: updatedFieldMetadata } };
}
