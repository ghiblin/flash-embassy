import React from 'react';
import PropTypes from 'prop-types';

const Finished = ({ totOk, totFail }) => (
  <div className="card">
    <h3>Finished!</h3>
    <div className="card__actions active">
      OK: {totOk}&nbsp;Fail: {totFail}
    </div>
  </div>
);

Finished.propTypes = {
  totOk: PropTypes.number,
  totFail: PropTypes.number,
};

Finished.defaultProps = {
  totOk: 0,
  totFail: 0,
};

export default Finished;
