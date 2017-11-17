import React from 'react';
import PropTypes from 'prop-types';
import Panel from './panel';
import _ from 'lodash';

class Container extends React.Component {
  state = {
    cardNumber: 0,
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
    }
  }
  
  incOK = (cardNumber) => {
    const card = this.props.cards[cardNumber];
    card.ok = (card.ok || 0) + 1;
    this.props.saveCard(card);
    this.showNextCard();
  }

  incFail = (cardNumber) => {
    const card = this.props.cards[cardNumber];
    card.fail = (card.fail || 0) + 1;
    this.props.saveCard(card);
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

  generateDots() {
    const times = this.props.cards.length;
    return _.times(times).map((num) => {
      const dotClass = num === this.state.cardNumber ? 'active' : '';
      return (
        <span
          key={num}
          className={`card-container__dot fa fa-circle ${dotClass}`}
          onClick={() => this.setState({ cardNumber: num })}
        />
      )
    });
  }

  render() {
    const { cards = [] } = this.props;
    return (
      <div>
        { this.generateCards() }
        <div className="card-container__dots-wrapper">
          { this.generateDots() }
        </div>
      </div>
    );
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
