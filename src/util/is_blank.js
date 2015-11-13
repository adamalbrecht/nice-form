import isEmpty from 'lodash/lang/isEmpty';
import isNaN from 'lodash/lang/isNaN';

export default function isBlank(obj) {
  switch (typeof obj) {
  case 'number':
    return isNaN(obj);
  case 'string':
    return (!obj || (obj.trim().length === 0))
  default:
    return isEmpty(obj);
  }
}
