import React from 'react';

const Finished = ({ totOk, totFail }) => (
  <div className="card">
    <h3>Finished!</h3>
    <div className="card__actions active">
      OK: {totOk}&nbsp;Fail: {totFail}
    </div>
  </div>
);

export default Finished;
