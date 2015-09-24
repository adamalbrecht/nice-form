/**
 * Given the existing metadata and the name of an input
 * that was just blurred, update and return the metadata
 * to reflect the fact that it was blurred.
 *
 * @param {metadata} data The form metadata.
 * @param {inputName} string The field that was blurred
 * @return {object} The updated form metadata
 */
export default function applyBlurToFormMetadata(metadata, inputName) {
  let updatedFieldMetadata = metadata.fields ? { ...metadata.fields[inputName] } : {};
  updatedFieldMetadata.hasBlurred = true;
  return { ...metadata, fields: { ...metadata.fields, [inputName]: updatedFieldMetadata } };
}
