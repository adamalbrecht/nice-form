import merge from 'lodash/object/merge';
/**
 *
 * @param {*} value The value of the field
 * @param {object} currentMetadata The current metadata to be merged
 * @return {object} The updated field metadata
 */
export default function initializeFieldMetadata(value=null, existingMetadata={}) {
  return  {
    valid: true,
    invalid: false,
    pristine: true,
    dirty: false,
    error: null,
    hasBlurred: false,
    initialValue: null,
    ...existingMetadata,
    currentValue: value,
  };
}
