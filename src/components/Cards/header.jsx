import React from 'react';

const Header = ({ addCard }) => (
  <div className='header'>
    <div className='header-content header-content__left'>
      
    </div>
    <div className='header-content header-content__middle'>
      Flash Embassy
    </div>
    <div className='header-content header-content__right'>
      <span className="fa fa-plus" onClick={ addCard } />
    </div>
  </div>
)

export default Header;