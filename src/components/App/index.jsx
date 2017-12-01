import React from 'react';
import { renderRoutes } from 'react-router-config';

// eslint-disable-next-line react/prop-types
function App({ route }) {
  return (
    <div className="container">
      { route && renderRoutes(route.routes) }
    </div>
  );
}

export default App;
