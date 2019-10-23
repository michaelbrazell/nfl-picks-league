import React from 'react';

import { withAuthorization } from '../Session';

import './Home.css';

const HomePage = () => (
  <div>
    <div className="round-navigation">
      <div className="round">
        Wildcard
      </div>
      <div className="round">
        Divisional
      </div>
      <div className="round">
        Championship
      </div>
      <div className="round">
        Super Bowl
      </div>
    </div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);