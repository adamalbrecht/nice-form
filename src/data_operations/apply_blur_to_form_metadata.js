import initializeFieldMetadata from './initialize_field_metadata';
/**
 * Given the existing metadata and the name of an input
 * that was just blurred, update and return the metadata
 * to reflect the fact that it was blurred.
 *
 * @param {object} metadata The form metadata.
 * @param {string} inputName The field that was blurred
 * @return {object} The updated form metadata
 */
export default function applyBlurToFormMetadata(metadata, inputName) {
  const fieldMetadata = (metadata.fields && metadata.fields[inputName]) ? metadata.fields[inputName] : initializeFieldMetadata();
  return { ...metadata, fields: { ...metadata.fields, [inputName]: { ...fieldMetadata, hasBlurred: true } } };
}
