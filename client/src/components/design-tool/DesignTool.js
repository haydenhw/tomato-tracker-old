import React, { Component } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import { connect } from 'react-redux';
import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import Board from 'components/board/Board';
import Module from 'components/modules/ModulesItem';
import ModuleContainer from 'components/modules/Modules';
import BoardDimensionInput from 'components/board/BoardDimensionForm';
import SideBar from 'components/side-bar/SideBar';
import SaveButton from './DesignToolSaveButton';
import Grid from './DesignToolGrid';

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
    
    document.body.addEventListener('mouseup', this.handleMouseUp.bind(this));
    document.body.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }
  
  handleMouseMove(evt) {
    const stageOffsetX = Number(this.stageContainer.getBoundingClientRect().left);
    const stageOffsetY = Number(this.stageContainer.getBoundingClientRect().top);
    const x = Number(evt.clientX) - stageOffsetX;
    const y = Number(evt.clientY) - stageOffsetY;
    
    this.setState({x, y});
  }
  
  handleMouseUp() {
    const newModuleData = this.props.draggingModuleData;  
    const newModuleCoordinates = {
      x: this.state.x - this.props.boardSpecs.x - newModuleData.width/2,
      y: this.state.y - this.props.boardSpecs.y - newModuleData.height/2
    }
    
    const newModule = Object.assign(newModuleCoordinates, newModuleData)
    
    if (this.state.isDraggingToBoard) {
      store.dispatch(actions.pushToCurrentProjectModules(newModule));
    }
    
    setTimeout(() => store.dispatch(actions.mouseDownOnIcon(false)), 1 )
    this.setState({isDraggingToBoard: false});
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
    
    const stageStyle = { "display": "inline-block" };
    
    return (
      <div onMouseMove={this.handleMouseMove.bind(this)}>
        <h1>{currentProjectName}</h1>
        <SaveButton/>
        <BoardDimensionInput />
        <div ref={(node) => this.stageContainer = node} >
          {isDraggingToBoard ? '' : sideBar}
          <div style={stageStyle}>
            <Stage 
              style={stageStyle} 
              ref="stage" 
              width={750} 
              height={500}
            >
              <Grid  gridWidth={5000}  cellWidth={20} />
              {currentProjectName ? <Board /> : <Layer></Layer>}
              {isMouseDownOnIcon ? <Layer>{draggingModule}</Layer> : <Layer></Layer> }
            </Stage>
          </div>
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
  draggingModuleData: state.draggingModule
  
});

export default connect(mapStateToProps)(DesignTool);
