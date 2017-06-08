import React from 'react';
import { Link } from 'react-router';

export default function App(props) {
  return (
    <div>
      <nav>
        <h1 className="logo-text">PomTracker</h1>
        <ul role="nav">
          <li className="nav-link"><Link to="/">Timer</Link></li>
          <li className="nav-link"><Link to="/Projects">Projects</Link></li>
        </ul>
      </nav>
      {props.children}
    </div>
  );
}