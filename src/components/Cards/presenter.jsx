import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Container from './container';

class Presenter extends React.Component {
  state = {
    showModal: false,
  }

  saveCard = (card) => {
    this.props.saveCard(card);
    this.setState({ showModal: false });
  }

  componentDidMount() {
    this.props.loadCards();
  }

  render() {
    const { cards, saveCard } = this.props;
    const { showModal } = this.state;

    return (
      <div className="wrapper">
        <Header title={ <span><i className="fa fa-cog" aria-hidden="true"></i>&nbsp;Training</span> } />
        <div className='content-wrapper'>
          <Container cards={ cards } saveCard={ saveCard }/>
        </div>
      </div>
    )
  }
}

Presenter.propTypes = {
  cards: PropTypes.array.isRequired,
  loadCards: PropTypes.func.isRequired,
  saveCard: PropTypes.func.isRequired,  
};

export default Presenter;
