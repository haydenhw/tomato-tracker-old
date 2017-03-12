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

class DesignTool extends Component {
  componentDidMount() {
    if(!this.props.currentProjectName) {
      const projectId = this.props.params.projectId;
      const currentRoute = this.props.location.pathname
      store.dispatch(actions.fetchProjectById(projectId, currentRoute));
    }
  }
  render () {
    return (
      <div>
        <h1>{this.props.currentProjectName}</h1>
        <SaveButton/>
        <BoardDimensionInput />
        <Stage ref="stage" width={5000} height={1000}>
          <Grid gridWidth={5000}  cellWidth={20} />
        {this.props.currentProjectName ? <Board /> : <Layer></Layer>}
        </Stage>
    </div>
     );
   }
}

const mapStateToProps = (state) => ({
  currentProjectName: state.currentProjectInfo.name
});

export default connect(mapStateToProps)(DesignTool);
