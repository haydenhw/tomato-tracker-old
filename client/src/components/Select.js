import React from 'react';

export default function Select(props) {
  const { handleChange ,options, renderOption } = props;
  
  const optionList = options.map(renderOption);
  
  return (
    <select onChange={handleChange}>
      {optionList}
    </select>
  );
}