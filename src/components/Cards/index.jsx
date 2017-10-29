import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators as cardActionCreators } from '../../ducks/card';
import Cards from './presenter';

function mapStateToProps(state) {
  const { cards } = state.card;
  return {
    cards,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadCards: bindActionCreators(cardActionCreators.doLoadCards, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
