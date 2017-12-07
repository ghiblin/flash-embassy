import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Panel extends React.Component {
  state = {
    showAnswer: false,
  }

  onClickOk = (e) => {
    e.stopPropagation();
    this.toggleAnswer();
    this.props.onSuccess(this.props.cardNumber);
  }

  onClickFail = (e) => {
    e.stopPropagation();
    this.toggleAnswer();
    this.props.onFail(this.props.cardNumber);
  }

  toggleAnswer = () => {
    this.setState({ showAnswer: !this.state.showAnswer });
  }

  generateDots() {
    const times = this.props.cards.length;
    return _.times(times).map((num) => {
      const dotClass = num === this.props.cardNumber ? 'active' : '';
      return (
        <span
          key={num}
          className={`card-container__dot fa fa-circle ${dotClass}`}
        />
      );
    });
  }

  render() {
    const { showAnswer } = this.state;
    const { cards, cardNumber } = this.props;
    const card = cards[cardNumber];
    const content = showAnswer ? card.english : card.italian;
    const iconClass = showAnswer ? 'reply' : 'share';
    const cardClass = showAnswer ? 'back' : '';
    const contentClass = showAnswer ? 'back' : 'front';
    const actionClass = showAnswer ? 'active' : '';

    // eslint-disable-next-line
    console.log(`Panel.render numCard:${cardNumber} => ${JSON.stringify(card)}`);

    return (
      <div>
        <div className={`card ${cardClass}`} onClick={this.toggleAnswer}>
          <span className="card__counter">{ this.props.cardNumber + 1 }</span>
          <div className="card__flip-card" onClick={this.toggleAnswer}>
            <span className={`fa fa-${iconClass}`} />
          </div>
          <div className={`card__content--${contentClass}`}>
            { content }
          </div>
          <div className={`card__actions ${actionClass}`}>
            <div className="card__button failure" onClick={this.onClickFail}>
              <i className="fa fa-thumbs-down" aria-hidden="true" />
            </div>
            <div className="card__button success" onClick={this.onClickOk}>
              <i className="fa fa-thumbs-up" aria-hidden="true" />
            </div>
          </div>
        </div>
        <div className="card-container__dots-wrapper">
          {this.generateDots()}
        </div>
      </div>
    );
  }
}

Panel.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    italian: PropTypes.string.isRequired,
    english: PropTypes.string.isRequired,
  })).isRequired,
  cardNumber: PropTypes.number.isRequired,
  onFail: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default Panel;
