import React, { Component } from 'react';

/*export default class SideBarModuleIcon extends Component {

  addModuleToState() {
    console.log(this.selectedModule);
  }

  render() {
    const style = {
      "height": "50px",
      "width": "50px",
      "backgroundColor": "blue"
    }
    
    return (
      <div 
      style={style}
      proxyId={this.props.proxyId}
      ref={(module) => { this.selectedModule = module; }} 
      onClick={this.addModuleToState.bind(this)} >
        I am a div
      </div>
      <div>hello</div>
    );
  }
}*/


export default class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
  }

  focus() {
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  }

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in an instance field (for example, this.textInput).
    return (
      <div>
        <input
          type="text"
          ref={(input) => { this.textInput = input; }} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focus}
        />
      </div>
    );
  }
}
