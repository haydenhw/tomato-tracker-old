import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/indexActions';
import store from '../../store';
import SideBarIcon from './SideBarIcon';

function SideBarIconList(props) {
  const { modules } = props;
  const iconList =  modules.map((module, index) => {
    return (
      <SideBarIcon 
        key={index} 
        parentId={ module._id } 
        iconImage={ module.image } 
        toggleDraggingToBoard = {props.toggleDraggingToBoard}
        toggleIsClicked={props.toggleIsClicked}
      /> 
    )
  });
  
  const style = {
    "magrin": "10px auto"
  }
  
  return (
    <div style={style}>
      {iconList}
    </div>
  )
}  
  
  
const mapStateToProps = (state, props) => ({
  modules: state.currentProjectModules
});

export default connect(mapStateToProps)(SideBarIconList);