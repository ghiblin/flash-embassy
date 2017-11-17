import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = ({ showHome = true, title, buttons = [] }) => (
  <div className='header'>
    <div className='header-content header-content__left'>
      {
        showHome
          ? <Link to="/">
              <i className="fa fa-chevron-left" aria-hidden="true"></i>&nbsp;Home
            </Link>
          : null
      }
    </div>
    <div className='header-content header-content__middle'>
      { title }
    </div>
    <div className='header-content header-content__right'>
      {
        buttons.map((el, i) => React.cloneElement(el, { key: i }))
      }
    </div>
  </div>
)

Header.propTypes = {
  showHome: PropTypes.bool,
  title: PropTypes.element,
  buttons: PropTypes.arrayOf(PropTypes.element),
};

export default Header;