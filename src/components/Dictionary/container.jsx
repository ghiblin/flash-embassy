import React from 'react';
import PropTypes from 'prop-types';
import './container.scss';

function getShortType(type) {
  switch(type) {
    case 'noun': return '(n.)';
    case 'verb': return '(v.)';
    case 'adjective': return '(adj.)';
    case 'adverb': return '(adv.)';
    case 'conjuction': return '(conj.)';
    case 'interjuction': return '()';
    default: return '';
  }
}

const Container = ({cards = [], deleteCard, editCard}) => (
  <div>
    <ul className="card__list">
      { 
        cards
          .map((el, i) => 
          <li key={i} onClick={ () => editCard(el.id) }>
            {getShortType(el.type)} {el.italian} - {el.english}
            <span className="card__destroy" onClick={ (evt) => { evt.stopPropagation(); deleteCard(i); } }>
              <i className="fa fa-times-circle" aria-hidden="true"></i>
            </span>
          </li>
        )
      }
    </ul>
  </div>
);

Container.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    italian: PropTypes.string.isRequired,
    english: PropTypes.string.isRequired,
    type: PropTypes.string,
  })),
  deleteCard: PropTypes.func.isRequired,
  editCard: PropTypes.func.isRequired,
};

export default Container;
