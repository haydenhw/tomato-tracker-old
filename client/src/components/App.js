import React from 'react';
import Timer from './Timer';
import TaskList from './TaskList';

export default function App() {
  return (
    <div className="countdown-timer">
      <Timer task={"coding"} seconds={360} />
      <TaskList tasks={getTasks()} />
    </div>
  );
}

function getTasks() {
  return ([
    {
      taskName: 'user flows',
      recordedTime: Math.random() * 100
    },
    {
      taskName: 'mock up',
      recordedTime: Math.random() * 100
    },
    {
      taskName: 'mvp',
      recordedTime: Math.random() * 100
    },
  ])
}
