import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const IconButton = ({ icon, onClick }) => (
  <div className="IconButton" onClick={onClick}>
    <i className={`fa fa-${icon}`} />
  </div>
);

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default IconButton;
