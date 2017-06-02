import React from 'react';
import { render } from 'react-dom';
import shortid from 'shortid';
import App from './components/App';
import './index.scss';

render(
    <App taskData={getTasks()} />,
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