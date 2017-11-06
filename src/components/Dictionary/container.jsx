import React from 'react';
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

const Container = ({cards = [], deleteCard}) => (
  <div>
    <ul className="card__list">
      { 
        cards
          .map((el, i) => 
          <li key={i}>
            {getShortType(el.type)} {el.italian} - {el.english}
            <span className="card__destroy" onClick={ () => deleteCard(i) }>
              <i className="fa fa-times-circle" aria-hidden="true"></i>
            </span>
          </li>
        )
      }
    </ul>
  </div>
);

export default Container;
