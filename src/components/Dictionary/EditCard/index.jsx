import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators as cardActionCreators } from '../../../ducks/card';
import { push } from 'react-router-redux';
import Form from './presenter';

function mapStateToProps(state, ownProps) {
  console.log('state:', state);
  console.log('ownProps:', ownProps);
  return {
    card: state.card.cards.filter(c => c.id === ownProps.id)[0],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveCard: bindActionCreators(cardActionCreators.doSaveCard, dispatch),
    closeModal: () => dispatch(push('/dictionary')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
