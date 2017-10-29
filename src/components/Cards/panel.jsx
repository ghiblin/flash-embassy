import React from 'react';

export default class Panel extends React.Component {
  state = {
    showAnswer: false,
  }

  toggleAnswer = () => {
    this.setState({ showAnswer: !this.state.showAnswer });
  }

  render() {
    const { showAnswer } = this.state;
    const content = showAnswer ? this.props.backContent : this.props.frontContent;
    const iconClass = showAnswer ? 'reply' : 'share';
    const cardClass = showAnswer ? 'back' : '';
    const contentClass = showAnswer ? 'back' : 'front';
    const actionClass = showAnswer ? 'active' : '';

    return (
      <div className={`card ${cardClass}`} onClick={ this.toggleAnswer }>
        <span className="card__counter">{ this.props.cardNumber + 1 }</span>
        <div className="card__flip-card" onClick={ this.toggleAnswer }>
          <span className={`fa fa-${iconClass}`} />
        </div>
        <div className={`card__content--${contentClass}`}>
          { content }
        </div>
        <div className={`card__actions ${actionClass}`}>
          <div className="card__button failure">
            <i className="fa fa-thumbs-down" aria-hidden="true"></i>
          </div>
          <div className="card__button success">
            <i className="fa fa-thumbs-up" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    )
  }
}
