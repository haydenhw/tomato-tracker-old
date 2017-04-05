import React, { Component } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import { connect } from 'react-redux';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import Board from 'components/board/Board';
import ModuleContainer from 'components/modules/Modules';
import Grid from './DesignToolGrid';

  class DesignToolStage extends Component {
    
  deleteModule() {
    store.dispatch(actions.deleteSelectedModule(this.props.selectedModuleIndex));
  }
  
  rotate() {
    store.dispatch(actions.rotateSelectedModule(this.props.selectedModuleProps));
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
  selectedModuleProps: state.selectedModule
});

export default connect(mapStateToProps)(DesignToolStage);

