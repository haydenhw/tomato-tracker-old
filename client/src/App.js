import React, { Component } from 'react';
import logo from './logo.svg';

class App extends Component {
  
    componentDidMount() {
      
      fetch('test')
      .then(function(response) { 
    // Convert to JSON
    return response.json();
    })
    .then(function(j) {
    // Yay, `j` is a JavaScript object
    console.log(j); 
    });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
        Heeeeelllllloooooo Wooooorrrrrrrlllllld 
        </p>
      </div>
    );
  }
}

export default App;
