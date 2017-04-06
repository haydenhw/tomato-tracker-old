import React, { Component } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import { connect } from 'react-redux';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import Board from 'components/board/Board';
import ModuleContainer from 'components/modules/Modules';
import Grid from './DesignToolGrid';
import getPerimeterSide from 'helpers/getPerimeterSide';
import bindToPerimeter from 'helpers/bindToPerimeter';
import rotateAboutCenter from 'helpers/rotateAboutCenter';


  class DesignToolStage extends Component {
    
  deleteModule() {
    
    store.dispatch(actions.deleteSelectedModule(this.props.selectedModuleIndex));
  }
  
  rotate() {
    const { 
      index,
      x,
      y,
      innerGroupX,
      innerGroupY,
      rotation,
      width,
      height
    } = this.props.selectedModuleProps;
    const { boardSpecs } = this.props;
    let { boundToSideIndex } = this.props.selectedModuleProps;
    let { topLeft } = this.props.anchorPositions;
    let newParentGroupCoordinates;
    let newInnerGroupCoordinates;
    
    if(Number.isInteger(boundToSideIndex)){
      boundToSideIndex = boundToSideIndex === 3 ? 0 : boundToSideIndex + 1;
      const coordinateData = {
        boundToSide: getPerimeterSide(boundToSideIndex),
        moduleX: x,
        moduleY: y,
        moduleWidth: width,
        moduleHeight: height, 
        topLeftAnchorX: topLeft.x,
        topLeftAnchorY: topLeft.y,
        boardWidth: boardSpecs.width,
        boardHeight: boardSpecs.height
      }
      newParentGroupCoordinates = bindToPerimeter(coordinateData);
    }
   
    newInnerGroupCoordinates = (
      rotateAboutCenter(rotation, innerGroupX, innerGroupY, width, height)
    );
    
    //console.log(isNaN(newParentGroupCoordinates.x))
    
    const rotationData = {
      boundToSideIndex,
      index,
      rotation: newInnerGroupCoordinates.rotation,
      innerGroupX: newInnerGroupCoordinates.x,
      innerGroupY: newInnerGroupCoordinates.y,
      parentGroupX: newParentGroupCoordinates ? newParentGroupCoordinates.x : x,
      parentGroupY: newParentGroupCoordinates ? newParentGroupCoordinates.y : y
    
    }
     
  store.dispatch(actions.rotateSelectedModule(rotationData));
    
  }
    
  render() {
    const { 
      shouldRenderBoard, 
      draggingModule, 
      isMouseDownOnIcon,
      isMouseDown,
      isMouseOverModule,
      isContextMenuOpen
     } = this.props;
     
    const contextMenu = (
      <ContextMenu id={'SIMPLE'}>
          <MenuItem onClick={this.deleteModule.bind(this)}>delete</MenuItem>
          <MenuItem onClick={this.rotate.bind(this)}>rotate</MenuItem>
      </ContextMenu>
    );
    
    const stageStyle = { "display": "inline-block"}
    return (
      <div>
        <ContextMenuTrigger
          id={'SIMPLE'} 
          name={'rect'}
          holdToDisplay={1000}
          >
            <div style={stageStyle}>
              <Stage 
                style={stageStyle} 
                ref="stage" 
                width={750} 
                height={500}
              >
                <Grid  gridWidth={5000}  cellWidth={20} />
                {shouldRenderBoard ? <Board /> : <Layer></Layer>}
                {isMouseDownOnIcon ? <Layer>{ draggingModule }</Layer> : <Layer></Layer> }
              </Stage>
            </div>
        </ContextMenuTrigger>
      
        {(!isMouseDown && isMouseOverModule) || isContextMenuOpen ? contextMenu : ''}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isMouseDownOnIcon: state.mouseEvents.mouseDownOnIcon,
  isMouseOverModule: state.mouseEvents.isMouseOverModule,
  isMouseDown: state.mouseEvents.isMouseDown,
  isContextMenuOpen: state.mouseEvents.isContextMenuOpen,
  selectedModuleIndex: state.selectedModule.index,
  selectedModuleProps: state.selectedModule,
  boardSpecs: state.boardSpecs,
  anchorPositions: state.anchorPositions
});

export default connect(mapStateToProps)(DesignToolStage);

