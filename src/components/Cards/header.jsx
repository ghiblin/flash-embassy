import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ addCard }) => (
  <div className='header'>
    <div className='header-content header-content__left'>
    <Link to="/">
        <i className="fa fa-chevron-left" aria-hidden="true"></i>&nbsp;Home
      </Link>
    </div>
    <div className='header-content header-content__middle'>
      <i className="fa fa-cog" aria-hidden="true"></i>&nbsp;Training
    </div>
    <div className='header-content header-content__right'>
      <span className="fa fa-plus" onClick={ addCard } />
    </div>
  </div>
)

export default Header;