import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { actionCreators as cardActionCreators } from '../../ducks/card';
import Cards from './presenter';

function mapStateToProps(state) {
  const { cards } = state.card;

  return {
    cards: _.shuffle(cards, 10),
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
