import React from 'react';
import shortid from 'shortid';
import Select from './Select';

export default function(props) {
  const { handleChange, options } = props;
  
  const renderTaskOption = optionText => (
    <option 
      key={shortid.generate()}
      value={id}
      >
         {optionText}
      </option>
  );
  
  return (
    
    <Select handleChange={handleChange} options={options} renderOption={renderTaskOption} />
  );
}