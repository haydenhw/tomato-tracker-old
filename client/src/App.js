import React, { Component } from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux';
import * as actions from './actions/index';

class App extends Component {
  
    componentDidMount() {
    
      this.props.getData('modules');

      /*fetch('modules')
      .then(function(response) { 
    // Convert to JSON
    return response.json();
    })
    .then(function(j) {
    // Yay, `j` is a JavaScript object
    console.log(j); 
    });*/
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

const mapDispatchToProps = (dispatch) => {
  return {
      getData: (url) => dispatch(actions.fetchModules(url))
  };
};

export default connect(null, mapDispatchToProps)(App);
