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
  
  logPosition() {
    const boardGroup = this.refs.boardGroup
    const x = boardGroup.get('.board')[0].getX();
    const y = boardGroup.get('.board')[0].getY();
    // console.log(x, y)
    //store.dispatch(actions.updateBoardPosition({x, y}))
    
  }
  
  updatePosition() {
    const boardGroup = this.refs.boardGroup
    const bx = boardGroup.get('.board')[0].getX();
    const by = boardGroup.get('.board')[0].getY();
    // console.log('board', bx, by)
    
    
    const x = boardGroup.getX();
    const y = boardGroup.getY();
    // console.log('group', x, y)
    //store.dispatch(actions.updateBoardPosition({x: x, y: y}))
    
  }
  render() {
  
      const {x, y, width, height} = this.props;
      // console.log(x, y)
      return (
        <Layer>
          <Group
            ref="boardGroup"
            x={x}
            y={y}
            width={width}
            height={height}
            draggable="true"
            //onDragMove={this.updatePosition.bind(this)}
            onDragEnd={this.updatePosition.bind(this)}
            >
              <Rect
                ref="board"
                name={"board"}
                width={width}
                height={height}
                fill="#e3e3e5"
                opacity="0.5"
                stroke="#ccc"
              
              />
              <Anchor x={0} y={0} name={"topLeft"} />
              <Anchor x={width} y={0} name={"topRight"} />
              <Anchor x={0} y={height} name={"bottomLeft"} />
              <Anchor x={width} y={height} name={"bottomRight"} />
              
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
  width: state.boardSpecs.width,
  height: state.boardSpecs.height,
  x: state.boardSpecs.x,
  y: state.boardSpecs.y
});

export default connect(mapStateToProps)(Board);