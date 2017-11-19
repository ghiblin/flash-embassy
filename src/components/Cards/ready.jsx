import React from 'react';
import PropTypes from 'prop-types';

const Ready = ({ start }) => (
  <div className="card">
    <h3>Ready?</h3>
    <div className="card__actions active">
      <div className="card__button go" onClick={ start }>GO!</div>
    </div>
  </div>
);

Ready.propTypes = {
  start: PropTypes.func.isRequired,
};

export default Ready;
