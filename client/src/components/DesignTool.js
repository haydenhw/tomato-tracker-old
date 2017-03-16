import React, { Component } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import { connect } from 'react-redux';
import * as actions from '../actions/indexActions';
import store from '../store';
import Grid from './Grid';
import MyRect from './Rect';
import Board from './Board';
import Module from './Module';
import ModuleContainer from './ModuleContainer';
import BoardDimensionInput from './BoardDimensionInput';
import SaveButton from './SaveButton';
import SideBar from './side-bar/SideBar';

class DesignTool extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      x: 0,
      y: 0,
      isSideBarHidden:false,
      isDraggingToBoard: false,
      isMouseOverBoard: false,
      iconParentId: null
    }
  }
  
  handleMouseUp() {
    store.dispatch(actions.mouseDownOnIcon(false))
    this.setState({isDraggingToBoard: false});
    //this.setState({x:, y:});
  }
  
  componentDidMount() {
    if(!this.props.currentProjectName) {
      const projectId = this.props.params.projectId;
      const currentRoute = this.props.location.pathname
      store.dispatch(actions.fetchProjectById(projectId, currentRoute));
    }
    
    document.body.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }
  
  /*componentWillUnmount() {
  document.body.removeEventListener('click', this.handleMouseUp);
  }
  */
  renderModule(evt) {
    
      const { x, y } = this.refs.stage.getStage().getPointerPosition();
      this.setState({x, y});
      console.log(this.state.x , this. state.y )
      console.log(evt)
      //console.log("client", evt.clientX, evt.clientY)
    /*const { x, y } = this.refs.stage.getStage().getPointerPosition();
    this.setState({x, y});*/
    
  }
  
  toggleDraggingToBoard() {
    
    if (this.props.isMouseDownOnIcon){
      this.setState({isDraggingToBoard: true});
    } 
    
  }
  
  render () {
    const { currentProjectName, draggingModuleData } = this.props;
    const {height, width, image } = draggingModuleData;
    const { x, y, isDraggingToBoard } = this.state;
    const draggingModule = 
      <Module 
        x={x} 
        y={y}
        height={height}
        width={width}
        image={image}
      />
      
    const sideBar = 
      <SideBar 
        toggleDraggingToBoard = {this.toggleDraggingToBoard.bind(this)} 
      />; 
    
    const rect =  <Rect x={this.state.x - 25} y={this.state.y - 25} height="50" width="50" fill="green"  />;
    const stageStyle = {
      "display": "inline-block"
    }
    return (
      <div>
        <h1>{currentProjectName}</h1>
        <SaveButton/>
        <BoardDimensionInput />
        <div>
          {isDraggingToBoard ? '' : sideBar}
          <div style={stageStyle}>
            <Stage style={stageStyle} 
              onMouseMove={this.renderModule.bind(this)} 
              ref="stage" 
              width={750} 
              height={500}
            >
              
                <Grid  gridWidth={5000}  cellWidth={20} />
                {currentProjectName ? <Board /> : <Layer></Layer>}
                {isDraggingToBoard ? <Layer>{draggingModule}</Layer> : <Layer></Layer> }
                
            </Stage>
          </div>
        </div>
    </div>
     );
   }
}

const mapStateToProps = (state) => ({
  currentProjectName: state.currentProjectInfo.name,
  isMouseDownOnIcon: state.mouseEvents.mouseDownOnIcon,
  draggingModuleData: state.draggingModule
});

export default connect(mapStateToProps)(DesignTool);
