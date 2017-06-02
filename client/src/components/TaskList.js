import React from 'react';
import shortid from 'shortid';
import List from './List';
import Task from './Task';

export default function TaskList(props) {
  const { tasks } = props;

  const renderTask = task => (
    <Task className="task" key={shortid.generate()} taskData={task} />
  ); 
  
  return(
    <div className="task-list">
      <List items={tasks} renderItem={renderTask} />
    </div>
  );
}

