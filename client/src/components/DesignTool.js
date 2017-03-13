import React, { Component } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import { connect } from 'react-redux';
import * as actions from '../actions/indexActions';
import store from '../store';
import Grid from './Grid';
import MyRect from './Rect';
import Board from './Board';
import ModuleContainer from './ModuleContainer';
import BoardDimensionInput from './BoardDimensionInput';
import SaveButton from './SaveButton';
import SideBar from './side-bar/SideBar';

class DesignTool extends Component {
  componentDidMount() {
    if(!this.props.currentProjectName) {
      const projectId = this.props.params.projectId;
      const currentRoute = this.props.location.pathname
      store.dispatch(actions.fetchProjectById(projectId, currentRoute));
    }
  }
  
  renderModule() {
    console.log('hello'/*this.refs.stage.getStage()*/)
  }
  
  render () {
    const stageStyle = {
      "display": "inline-block"
    }
    return (
      <div>
        <h1>{this.props.currentProjectName}</h1>
        <SaveButton/>
        <BoardDimensionInput />
        <div>
          <SideBar />
          <div style={stageStyle}>
            <Stage style={stageStyle} ref="stage" width={750} height={500}>
              <Grid  gridWidth={5000}  cellWidth={20} />
            {this.props.currentProjectName ? <Board /> : <Layer></Layer>}
            </Stage>
          </div>
        </div>
    </div>
     );
   }
}

const mapStateToProps = (state) => ({
  currentProjectName: state.currentProjectInfo.name
});

export default connect(mapStateToProps)(DesignTool);
