import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { actionCreators as cardActionCreators } from '../../ducks/card';
import Cards from './presenter';

function mapStateToProps(state) {
  const { cards } = state.card;
  return {
    cards: cards.sort((a, b) => (a.italian.toLowerCase() < b.italian.toLowerCase() ? -1 : 1)),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadCards: bindActionCreators(cardActionCreators.doLoadCards, dispatch),
    addCards: bindActionCreators(cardActionCreators.doAddCards, dispatch),
    saveCard: bindActionCreators(cardActionCreators.doSaveCard, dispatch),
    deleteCard: bindActionCreators(cardActionCreators.doDeleteCard, dispatch),
    newCard: () => dispatch(push('/dictionary/new')),
    uploadCards: () => dispatch(push('/dictionary/upload')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
