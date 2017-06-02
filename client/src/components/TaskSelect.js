import React from 'react';
import shortid from 'shortid';
import Select from './Select';

export default function(props) {
  const { options } = props;
  
  const renderTaskOption = optionText => (
    <option key={shortid.generate()} value={optionText.toLowerCase()}>{optionText}</option>
  );
  
  return (
    <Select options={options} renderOption={renderTaskOption} />
  );
}