import React from 'react';
import { render } from 'react-dom';
import shortid from 'shortid';
import TimeTrackerPage from './containers/TimeTrackerPage';
import './index.scss';

render(
    <TimeTrackerPage />,
  document.getElementById('root')
);

function getTasks() {
  return ([
    {
      taskName: 'user flows',
      recordedTime: Math.random() * 100,
      id: shortid.generate()
    },
    {
      taskName: 'mock up',
      recordedTime: Math.random() * 100,
      id: shortid.generate()
    },
    {
      taskName: 'mvp',
      recordedTime: Math.random() * 100,
      id: shortid.generate()
    },
  ])
}