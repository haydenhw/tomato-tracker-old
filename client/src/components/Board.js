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
  
  render() {
      //store.dispatch(actions.updateBoardDimensions({width: 300, height: 200}))
    
      return (
        <Layer>
          <Group
            draggable="true"
            >
              <Rect
                ref="board"
                name={"board"}
                width={this.props.boardWidth}
                height="300"
                fill="#e3e3e5"
                opacity="0.5"
                stroke="#ccc"
                onMouseMove={this.test.bind(this)}
              />
              <Anchor x={0} y={0} name={"topLeft"} />
              <Anchor x={500} y={0} name={"topRight"} />
              <Anchor x={0} y={500} name={"bottomLeft"} />
              <Anchor x={500} y={500} name={"bottomRight"} />
              
              <RectContainer />
          </Group>
        </Layer>
          
      );
  }
}

const mapStateToProps = (state) => ({
  boardWidth: state.width
  // boardHeight: state.boardDimensions.height
});

export default connect(mapStateToProps)(Board);