import React from 'react';

export default function Task(props) {
  const { taskData } = props;
  const { taskName, recordedTime } = taskData;
  
  return(
    <div className="task">
      <span>{taskName}</span>
      <span>{recordedTime}</span>
    </div>
  );
}