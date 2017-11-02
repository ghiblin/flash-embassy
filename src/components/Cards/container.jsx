import React from 'react';
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

  showNextCard = (e) => {
    e.stopPropagation();
    if ((this.state.cardNumber + 1) < this.props.cards.length) {
      this.setState({ cardNumber: this.state.cardNumber + 1 });
    }
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
          showPrevCard={(cardNumber>0) ? this.showPrevCard : null}
          showNextCard={((cardNumber+1)<cards.length) ? this.showNextCard : null}
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

export default Container;
