import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { actionCreators as cardActionCreators } from '../../../ducks/card';
import Form from './presenter';

function mapDispatchToProps(dispatch) {
  return {
    upload: bindActionCreators(cardActionCreators.doAddCards, dispatch),
    cancel: () => dispatch(push('/dictionary')),
  };
}

export default connect(null, mapDispatchToProps)(Form);
