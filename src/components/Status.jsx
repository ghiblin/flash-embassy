import React from 'react';
import { Route } from 'react-router-dom';

export default ({ status, children }) => (
  <Route render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = status;
      }

      return children;
    }}
  />
);
