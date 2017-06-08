import React, {Component} from 'react';
import shortid from 'shortid';

import TimeTracker from './TimeTracker';
import { tasks } from './data';
export default class TimeTrackerPage extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      tasks: tasks,
      isFetching: false
    }
  }
  
  componentDidMount() {
    /*console.log('mounting')
    this.setState({isFetching: true});
    
    fetch('/projects')
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        this.setState({
          tasks: data.projects[0].tasks,
          isFetching: false
        });
      })
      .catch((err) => {
        this.setState({isFetching: false});
        console.error(err);
      });*/
  }
  
  render() {
    const { tasks } = this.state; 
    const tasksWithShortIds = tasks.map(task => (
      Object.assign(task, {id: shortid.generate()})
    )); 
    
    return (
      <div className="time-tracker-page-container">
        <TimeTracker tasks={tasksWithShortIds} />
      </div>
    );
  }
}