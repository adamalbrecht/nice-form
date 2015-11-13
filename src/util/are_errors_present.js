import isBlank from './is_blank';
import some from 'lodash/collection/some';

export default function areErrorsPresent(errors={}) {
  return some(errors, (field) => !isBlank(field));
}
