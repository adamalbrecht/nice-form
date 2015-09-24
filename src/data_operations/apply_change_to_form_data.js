/**
 * Given the existing form data and the name of an input
 * that was just changed, update and return the data
 * to reflect the change.
 *
 * @param {object} data The form data.
 * @param {string} inputName The field that was changed
 * @param {*} newValue The new value of the field
 * @return {object} The updated form metadata
 */
export default function applyChangeToFormData(currentData, inputName, newValue) {
  return { ...currentData, [inputName]: newValue }
}

