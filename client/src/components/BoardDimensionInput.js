import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/action-index';
import store from '../store';

class BoardDimensionInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: '',
      height: ''
    };

    this.handleChange = this.handleWidthChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleWidthChange(event) {
    this.setState({value: event.target.value});
    store.dispatch(actions.updateBoardDimensions({width: event.target.value, height: this.props.boardHeight }))
  }
  
  /*handleHeightChange(event) {
    this.setState({value: event.target.value});
    store.dispatch(actions.updateBoardDimensions({width: this.props.boardHeight, height: event.target.value }))
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }*/

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Width: 
          <input type="text" value={this.props.boardWidth} onChange={this.handleWidthChange} />
        </label>
         
      </form>
    );
  }
}

/*<label>
 Height: 
 <input type="text" value={this.props.boardHeight} onChange={this.handleHeightChange.bind(this)} />
</label>
<input type="submit" value="Submit" />*/

const mapStateToProps = (state, props) => ({
  boardWidth: state.width,
  boardHeight: state.height
  
  
});

export default connect(mapStateToProps)(BoardDimensionInput);
