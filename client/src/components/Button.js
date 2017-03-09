import React, { Component } from 'react';
import * as actions from '../actions/indexActions';
import store from '../store'

export default class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
   store.dispatch(actions.updateBoardDimensions({width: 300, height: 200}))
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}