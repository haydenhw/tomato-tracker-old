import React from 'react';
import { Router, Link, hashHistory } from 'react-router';

export default function HomePage(props) {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Link to='/app'>Go to the App</Link>
      
    </div>
  )
}