import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators as cardActionCreators } from '../../ducks/card';
import Cards from './presenter';
import _ from 'lodash';

function mapStateToProps(state) {
  const { cards } = state.card;
  
  return {
    cards: _.shuffle(cards, 10),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadCards: bindActionCreators(cardActionCreators.doLoadCards, dispatch),
    saveCard: bindActionCreators(cardActionCreators.doSaveCard, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
