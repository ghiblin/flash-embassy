import React from 'react';
import PropTypes from 'prop-types';
import Panel from './panel';
import _ from 'lodash';

import Branch from './branch';

class Container extends React.Component {
  state = {
    cardNumber: 0,
    totOk: 0,
    totFail: 0,
    status: 'ready',
  }

  start = (e) => {
    e.stopPropagation();
    this.setState({ status: 'running'});
  }

  showPrevCard = (e) => {
    e.stopPropagation();
    if (this.state.cardNumber > 0) {
      this.setState({ cardNumber: this.state.cardNumber - 1 });
    }
  }

  showNextCard() {
    if ((this.state.cardNumber + 1) < this.props.cards.length) {
      this.setState({ cardNumber: this.state.cardNumber + 1 });
    } else {
      this.setState({ status: 'finished' });
    }
  }
  
  incOK = (cardNumber) => {
    const card = this.props.cards[cardNumber];
    card.ok = (card.ok || 0) + 1;
    this.props.saveCard(card);
    this.setState({ totOk: this.state.totOk + 1 });
    this.showNextCard();
  }

  incFail = (cardNumber) => {
    const card = this.props.cards[cardNumber];
    card.fail = (card.fail || 0) + 1;
    this.props.saveCard(card);
    this.setState({ totFail: this.state.totFail + 1 });
    this.showNextCard();
  }

  generateCards() {
    const { cards } = this.props;
    const { cardNumber } = this.state;
    return cards
      .filter((el, i) => i === cardNumber)
      .map((card, i) => (
        <Panel
          key={i}
          frontContent={card.italian}
          backContent={card.english}
          onSuccess={ this.incOK }
          onFail={ this.incFail }
          cardNumber={cardNumber}
        />
      ));
  }

  render() {
    const { cards = [] } = this.props;

    return (
      <Branch
        cards={cards}
        start={this.start}
        onSuccess={this.incOK}
        onFail={this.incFail}
        {...this.state}
      />
    );
    /*
    return (
      <div>
        { this.generateCards() }
        <div className="card-container__dots-wrapper">
          { this.generateDots() }
        </div>
      </div>
    );
    */
  }
}

Container.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    italian: PropTypes.string.isRequired,
    english: PropTypes.string.isRequired,
    type: PropTypes.string,
    ok: PropTypes.number,
    fail: PropTypes.number,
  })).isRequired,
  saveCard: PropTypes.func.isRequired,
}

export default Container;
