import React from 'react'
import { Link } from 'react-router'

export default function App() {
  return (
    <div>
      <h1>PomTracker</h1>
      <ul role="nav">
        <li><Link to="/Timer">Timer</Link></li>
        <li><Link to="/Projects">Projects</Link></li>
      </ul>
    </div>
  );
}