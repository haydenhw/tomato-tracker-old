import React, { Component } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import { connect } from 'react-redux';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import Board from 'components/board/Board';
import Module from 'components/modules/ModulesItem';
import ModuleContainer from 'components/modules/Modules';
import BoardDimensionInput from 'components/board/BoardDimensionForm';
import SideBar from 'components/side-bar/SideBar';
import DesignToolStage from './DesignToolStage';
import SaveButton from './DesignToolSaveButton';

class DesignTool extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      x: 0,
      y: 0,
      isSideBarHidden:false,
      isDraggingToBoard: false
    }
  }
  
  componentDidMount() {
    if(!this.props.currentProjectName) {
      const projectId = this.props.params.projectId;
      const currentRoute = this.props.location.pathname
      
      store.dispatch(actions.fetchProjectById(projectId, currentRoute));
    }
    
    document.body.addEventListener('mousedown', this.handleMouseDown.bind(this));
    document.body.addEventListener('mouseup', this.handleMouseUp.bind(this));
    document.body.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.body.addEventListener('keyup', this.handleKeyUp.bind(this))
  }
  
  dropDraggingModule() {
    
    const newModuleData = this.props.draggingModuleData;  
    const newModuleCoordinates = {
      x: this.state.x - this.props.boardSpecs.x - newModuleData.width/2,
      y: this.state.y - this.props.boardSpecs.y - newModuleData.height/2
    }
    
    const newModule = Object.assign(newModuleCoordinates, newModuleData)
    console.log(newModule)
    if (this.state.isDraggingToBoard) {
      store.dispatch(actions.pushToCurrentProjectModules(newModule));
    }
    
    setTimeout(() => store.dispatch(actions.mouseDownOnIcon(false)), 1 )
    this.setState({isDraggingToBoard: false});
  }
  
  handleKeyUp(evt) {
    const {isMouseOverModule, selectedModuleIndex } = this.props;
    
    if(isMouseOverModule) {
      store.dispatch(actions.deleteSelectedModule(selectedModuleIndex));
    }
    
  }
  
  handleMouseMove(evt) {
    const stageOffsetX = Number(this.stageContainer.getBoundingClientRect().left);
    const stageOffsetY = Number(this.stageContainer.getBoundingClientRect().top);
    const x = Number(evt.clientX) - stageOffsetX;
    const y = Number(evt.clientY) - stageOffsetY;
    
    this.setState({x, y});
  }
  
  handleMouseDown(evt) {
    // console.log(evt.which)
     switch (evt.which){
        case 3:
          if (this.props.isMouseOverModule) {
            store.dispatch(actions.toggleIsContextMenuOpen(true));
          } else {
            store.dispatch(actions.toggleIsContextMenuOpen(false));
          }
          break;
        
        case 1:
          const contextMenuClass = event.target.getAttribute('class');
          
          if (!contextMenuClass) {
            store.dispatch(actions.toggleIsContextMenuOpen(false));
          }
          
          break;
     }
    
    // store.dispatch(actions.toggleIsMouseDown());
  }
  
  handleMouseUp() {
    this.dropDraggingModule();
    // store.dispatch(actions.toggleIsMouseDown());
  }
  
  toggleDraggingToBoard() {
    if (this.props.isMouseDownOnIcon){
      this.setState({isDraggingToBoard: true});
    } 
  }
  
  render () {
    const { currentProjectName, draggingModuleData , isMouseDownOnIcon } = this.props;
    const {height, width, image } = draggingModuleData;
    const { x, y, isDraggingToBoard } = this.state;
    
    const draggingModule = ( 
      <Module
        x={x - width/2} 
        y={y - height/2}
        height={height}
        width={width}
        image={image}
      />
    );
      
    const sideBar = (
      <SideBar 
        toggleDraggingToBoard = {this.toggleDraggingToBoard.bind(this)} 
      /> 
    );
    
    return (
      <div onMouseMove={this.handleMouseMove.bind(this)}>
        <h1>{currentProjectName}</h1>
        <SaveButton/>
        <BoardDimensionInput />
        <div ref={(node) => this.stageContainer = node} >
          { isDraggingToBoard ? '' : sideBar }
          <DesignToolStage 
            shouldRenderBoard = { currentProjectName }
            draggingModule = { draggingModule }
          />  
        </div>
    </div>
     );
   }
}

const mapStateToProps = (state) => ({
  currentProjectName: state.currentProjectInfo.name,
  currentProjectModules: state.currentProjectModules,
  boardSpecs: state.boardSpecs,
  isMouseDownOnIcon: state.mouseEvents.mouseDownOnIcon,
  isMouseOverModule: state.mouseEvents.isMouseOverModule,
  draggingModuleData: state.draggingModule,
  selectedModuleIndex: state.selectedModule.index,
  
  
});

export default connect(mapStateToProps)(DesignTool);
