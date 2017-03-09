import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/action-index';
import store from '../store';

class BoardDimensionInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    store.dispatch(actions.updateBoardDimensions({width: Number(event.target.value), height: 200}))
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Width:
          <input type="text" value={this.props.boardWidth} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
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
  boardWidth: state.boardSpecs.width,
  boardHeight: state.boardSpecs.height
});

export default connect(mapStateToProps)(BoardDimensionInput);
