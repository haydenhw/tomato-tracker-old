import React, {Component} from 'react';
import TimeTracker from './TimeTracker';

export default class TimeTrackerPage extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      tasks: []
    }
  }
  
  componentDidMount() {
    
  }
  
  render() {
    const { tasks } = this.state; 
    
    return (
      <TimeTracker tasks={tasks} />
    )
  }
}