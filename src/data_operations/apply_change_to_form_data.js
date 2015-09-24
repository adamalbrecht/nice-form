
export default function applyChangeToFormData(currentData, inputName, newValue) {
  return { ...currentData, [inputName]: newValue }
}


