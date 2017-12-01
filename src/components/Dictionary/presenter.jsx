import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Container from './container';
import Form from './form';

export default class Presenter extends React.Component {
  state = {
    showModal: false,
    card: {},
  }

  componentDidMount() {
    this.props.loadCards();
  }

  openModal = (id) => {
    this.setState({
      showModal: true,
      card: this.props.cards.filter(el => el.id === id)[0] || {},
    });
  }

  closeModal = () => {
    this.setState({
      showModal: false,
      card: {},
    });
  }

  saveCard = (card) => {
    this.props.saveCard(card);
    this.setState({ showModal: false });
  }

  deleteCard = (id) => {
    this.props.deleteCard(id);
  }

  render() {
    const { cards } = this.props;
    const { showModal, card = {} } = this.state;
    return (
      <div className="wrapper">
        <Header
          title={<span><i className="fa fa-book" aria-hidden="true" />&nbsp;Dictionary</span>}
          buttons={[<span className="fa fa-plus" onClick={() => this.openModal()} />]}
        />
        <div className="content-wrapper">
          <Container cards={cards} deleteCard={this.deleteCard} editCard={this.openModal} />
          {
            showModal
              ? <Form closeModal={this.closeModal} saveCard={this.saveCard} {...card} />
              : null
          }
        </div>
      </div>
    );
  }
}

Presenter.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    italian: PropTypes.string.isRequired,
    english: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['noun', 'verb', 'adjective', 'adverb', 'conjuction', 'interjuction']),
    ok: PropTypes.number,
    fail: PropTypes.number,
  })),
  loadCards: PropTypes.func.isRequired,
  saveCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
};

Presenter.defaultProps = {
  cards: [],
};
