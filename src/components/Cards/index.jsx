import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { actionCreators as cardActionCreators } from '../../ducks/card';
import Cards from './presenter';

function ratio(card) {
  const ok = card.ok || 0;
  const ko = card.fail || 0;
  const n = ok + ko;
  const alpha = n < 5 ? 0 : (ok / ko);
  return alpha * n;
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
