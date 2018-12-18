import { prettyPrint } from 'pretty-printy';
import { props } from './props.mockData';
import * as typeCheck from './propTypeGenUtils';
console.log('\n**Logs**');


test('pretty print', async () => {
  expect(true).toBe(true);
});

const getType = (propVal) => {
  if (typeCheck.isNumber(propVal)) {
    return 'number';
  }

  if (typeCheck.isBool(propVal)) {
    return 'bool';
  }


  if (typeCheck.isString(propVal)) {
    return 'string';
  }

  if (typeCheck.isArray(propVal)) {
    return 'array';
  }

  if (typeCheck.isObject(propVal)) {
    return 'object';
  }

  if (typeCheck.isFunc(propVal)) {
    return 'func';
  }

  return 'FIX_ME';
}

const getPropTypeLine = (type) => `PropTypes.${type}`;

const getPropTypeLines = props => (
  Object.keys(props).reduce((acc, curr) => {
    acc[curr] = getPropTypeLine(getType(props[curr]));
    return acc;
  }, {})
);

const wrapPropTypes = (componentName, propTypeLines) => (
  `${componentName}.propTypes = ${propTypeLines}`
);

const removeQuotes = str => str.replace(/"/g, '');

export const logPropTypes = (componentName, props) => (
  removeQuotes(
      wrapPropTypes(componentName, JSON.stringify(getPropTypeLines(props), null, 2))
  )
);


const res = logPropTypes('Timer', props);
console.log(res)
