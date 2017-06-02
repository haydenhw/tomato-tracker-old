import React, {Component} from 'react';
import TimeTracker from './TimeTracker';

export default class TimeTrackerPage extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      tasks: [],
      isFetching: false
    }
  }
  
  componentDidMount() {
    this.setState({isFetching: true});
    
    fetch('/projects')
      .then(res => res.json())
      .then((data) => {
        this.setState({
          tasks: data.projects[0].tasks,
          isFetching: false
        });
      })
      .catch((err) => {
        this.setState({isFetching: false});
        console.error(err);
      });
  }
  
  render() {
    const { tasks } = this.state; 
    
    return (
      <TimeTracker tasks={tasks} />
    )
  }
}