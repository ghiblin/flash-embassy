import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const IconButton = ({ icon, onClick, className }) => (
  <div className={`IconButton ${className}`} onClick={onClick}>
    <i className={`fa fa-${icon}`} />
  </div>
);

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

IconButton.defaultProps = {
  className: '',
};

export default IconButton;
