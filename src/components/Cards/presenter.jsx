import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Branch from './branch';

import './styles.scss';

class Presenter extends React.Component {
  state = {
    cardNumber: 0,
    totOk: 0,
    totFail: 0,
    status: 'ready',
  }

  componentDidMount() {
    this.props.loadCards();
  }

  start = (e) => {
    e.stopPropagation();
    this.setState({ status: 'running' });
  }

  showNextCard(state) {
    if ((this.state.cardNumber + 1) < this.props.cards.length) {
      this.setState({
        ...state,
        cardNumber: this.state.cardNumber + 1,
      });
    } else {
      this.props.saveCards(this.props.cards);
      this.setState({
        ...state,
        status: 'finished',
      });
    }
  }

  incOK = (cardNumber) => {
    const card = this.props.cards[cardNumber];
    card.ok = (card.ok || 0) + 1;
    this.showNextCard({ totOk: this.state.totOk + 1 });
  }

  incFail = (cardNumber) => {
    const card = this.props.cards[cardNumber];
    card.fail = (card.fail || 0) + 1;
    this.showNextCard({ totFail: this.state.totFail + 1 });
  }

  render() {
    const { cards } = this.props;

    return (
      <div className="wrapper">
        <Header title={<span><i className="fa fa-cog" aria-hidden="true" />&nbsp;M.E.M.O.</span>} />
        <div className="content-wrapper">
          <Branch
            cards={cards}
            start={this.start}
            onSuccess={this.incOK}
            onFail={this.incFail}
            {...this.state}
          />
        </div>
      </div>
    );
  }
}

Presenter.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    italian: PropTypes.string.isRequired,
    english: PropTypes.string.isRequired,
  })).isRequired,
  loadCards: PropTypes.func.isRequired,
  saveCards: PropTypes.func.isRequired,
};

export default Presenter;
