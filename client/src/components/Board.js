import React, { Component } from 'react';
import { Layer, Rect, Group } from 'react-konva';
import { connect } from 'react-redux';
import RectContainer from './RectContainer';
import Anchor from './Anchor';
import * as actions from '../actions/action-index';
import store from '../store';

class Board extends Component {
  
  test() {
    
  }
  componentDidMount() {
    //store.dispatch(actions.updateBoardDimensions({width: 300, height: 200}))
  }
  
  render() {
      //console.log(this.props)
      return (
        <Layer>
          <Group
            draggable="true"
            >
              <Rect
              
                ref="board"
                name={"board"}
                width={this.props.boardWidth}
                height={this.props.boardHeight}
                fill="#e3e3e5"
                opacity="0.5"
                stroke="#ccc"
              
              />
              <Anchor x={0} y={0} name={"topLeft"} />
              <Anchor x={this.props.boardWidth} y={0} name={"topRight"} />
              <Anchor x={0} y={this.props.boardHeight} name={"bottomLeft"} />
              <Anchor x={this.props.boardWidth} y={this.props.boardHeight} name={"bottomRight"} />
              
              <RectContainer />
          </Group>
        </Layer>
          
      );
  }
}

/*x={100}
y={25}
*/

const mapStateToProps = (state) => ({
  boardWidth: state.width,
  boardHeight: state.height
  // boardHeight: state.boardDimensions.height
});

export default connect(mapStateToProps)(Board);