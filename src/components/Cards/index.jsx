import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { actionCreators as cardActionCreators } from '../../ducks/card';
import Cards from './presenter';

function ratio(card) {
  return (card.ok || 0) / ((card.ok || 0) + (card.fail || 0) + 10);
}

function mapStateToProps(state) {
  const cards = state.card.cards.sort((a, b) => ratio(a) - ratio(b));


  return {
    cards: _.chunk(_.shuffle(_.slice(cards, 0, 30)), 10)[0],
    allCards: cards,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadCards: bindActionCreators(cardActionCreators.doLoadCards, dispatch),
    saveCards: bindActionCreators(cardActionCreators.doUpdateCards, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
