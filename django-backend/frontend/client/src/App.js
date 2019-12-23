import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';


function App() {
  const url = 'http://localhost:8000/projects/';

  axios.post(url, {
      name: 'hello',
      tasks: []
  })
      .then(res => {
        console.log(res.status);
      });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
