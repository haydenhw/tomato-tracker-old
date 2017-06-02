import React, {Component} from 'react';
import TimeTracker from './TimeTracker';

export default class TimeTrackerPage extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      tasks: [],
      isFetching: false;
    }
  }
  
  componentDidMount() {
    this.setState({isFetching: true});
    
    fetch('/projects')
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        this.setState({
          tasks: data
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
    console.log(tasks)
    return (
      <TimeTracker tasks={tasks} />
    )
  }
}