import React from 'react';

export default function Select(props) {
  const { options, renderOption } = props;
  
  const optionList = options.map(renderOption);
  
  return (
    <select>
      {optionList}
    </select>
  );
}