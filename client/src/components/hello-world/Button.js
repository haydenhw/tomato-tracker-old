import React, { Component } from 'react';

export default function Button(props) {
  function handleClick() {
    {props.clickAction()}
  }
  
  return (
    <button style={props.style} onClick={() => handleClick()}>
      {props.text}
    </button>
  );
}
