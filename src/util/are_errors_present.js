import isBlank from './is_blank';
import { some } from 'lodash';

export default function areErrorsPresent(errors={}) {
  return some(errors, (field) => !isBlank(field));
}
