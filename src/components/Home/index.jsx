import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

const Home = () => (
  <div className="home-container">
    <div className="link-panel">
      <Link to='/dictionary'>Dictionary</Link>
    </div>
    <div className="link-panel">
      <Link to='/training'>Training</Link>
    </div>
  </div>
);

export default Home;
