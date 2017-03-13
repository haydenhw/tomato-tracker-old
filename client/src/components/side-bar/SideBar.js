import React, { Component } from 'react';
import SideBarIconList from './SideBarIconList';
import SideBarIcon from './SideBarIcon';

export default function SideBar(props) {
  const style = {
    "height": "100%",
    "width": "100px",
    "display": "inline-block",
    "verticalAlign": "top"
  }
  
  return (
    <div style={style}>
      This is a side bar
      <SideBarIconList />
    </div>
  );
}