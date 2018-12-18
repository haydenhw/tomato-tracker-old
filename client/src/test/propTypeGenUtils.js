

const isNumber = (val) => typeof val === 'number';
const isBool = (val) => typeof val === 'boolean';
const isFunc = (val) => typeof val === 'function';
const isString = val => typeof val === 'string' || val instanceof String;
const isArray = val => Array.isArray(val);
const isObject = val => (
  val === null
    ? false
    : Array.isArray(val)
    ? false
    : typeof val === 'function'
    ? false
    : typeof val === 'object'
);

export {
  isBool,
  isNumber,
  isArray,
  isString,
  isFunc,
  isObject,
}
