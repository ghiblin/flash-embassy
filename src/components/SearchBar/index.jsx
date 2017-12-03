import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const SearchBar = ({ searchTerm, onInputChange }) => (
  <div className="SearchBox">
    <span className="icon">
      <i className="fa fa-search" />
    </span>
    <input
      type="search"
      placeholder="Search..."
      value={searchTerm}
      onChange={onInputChange}
    />
  </div>
);

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default SearchBar;
