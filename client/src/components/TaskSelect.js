import React from 'react';
import shortid from 'shortid';
import Select from './Select';

export default function(props) {
  const { handleChange, tasks } = props;
  
  const renderTaskOption = task => (
    <option 
      key={shortid.generate()}
      value={task.id}
      >
         {task.taskName}
      </option>
  );
  
  return (
    
    <Select handleChange={handleChange} options={tasks} renderOption={renderTaskOption} />
  );
}