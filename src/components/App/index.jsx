import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../Home';
import Dictionary from '../Dictionary';
import Cards from '../Cards';
import NotFound from '../NotFound';

// eslint-disable-next-line react/prop-types
import './styles.scss';

const App = () => (
  <div className="container">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/dictionary" component={Dictionary} />
      <Route path="/training" component={Cards} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default App;
