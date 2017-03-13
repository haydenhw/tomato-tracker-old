import React, { Component } from 'react';
import SideBarIcon from './SideBarIcon';

export default function sideBarIconList(props) {
  const style = {
    "magrin": "10px auto"
  }
  return (
    <div style={style}>
      <SideBarIcon proxyId={1} />
      <SideBarIcon proxyId={2} />
      <SideBarIcon proxyId={3} />
    </div>
  )
}