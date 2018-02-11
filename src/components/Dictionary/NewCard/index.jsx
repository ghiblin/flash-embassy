import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators as cardActionCreators } from '../../../ducks/card';
import { push } from 'react-router-redux';
import Form from './presenter';

function mapDispatchToProps(dispatch) {
  return {
    saveCard: bindActionCreators(cardActionCreators.doSaveCard, dispatch),
    closeModal: () => dispatch(push('/dictionary')),
  };
}

export default connect(null, mapDispatchToProps)(Form);
