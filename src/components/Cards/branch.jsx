import React from 'react';
import PropTypes from 'prop-types';

import Ready from './ready';
import Panel from './panel';
import Finished from './finished';

const CardBranch = ({
  status,
  start,
  onSuccess,
  onFail,
  cards = [],
  cardNumber = 0,
  totOk = 0,
  totFail = 0,
}) => {
  switch (status) {
    case 'ready':
      return (<Ready start={start} />);

    case 'running':
      return (
        <Panel
          cards={cards}
          cardNumber={cardNumber}
          onSuccess={onSuccess}
          onFail={onFail}
        />
      );

    case 'finished':
      return <Finished totOk={totOk} totFail={totFail} />;

    default:
      return <div />;
  }
};

CardBranch.propTypes = {
  status: PropTypes.oneOf(['ready', 'running', 'finished']).isRequired,
  start: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFail: PropTypes.func.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({
    italian: PropTypes.string.isRequired,
    english: PropTypes.string.isRequired,
  })).isRequired,
  cardNumber: PropTypes.number.isRequired,
  totOk: PropTypes.number,
  totFail: PropTypes.number,
};

CardBranch.defaultProps = {
  totOk: 0,
  totFail: 0,
};

export default CardBranch;
