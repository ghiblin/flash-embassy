import React from 'react';
import Header from './header';
import Container from './container';
import Form from './form';

class Presenter extends React.Component {
  state = {
    showModal: false,
    card: {}
  }

  openModal = (id) => {
    this.setState({ 
      showModal: true,
      card: (id >= 0) ? { id, ...this.props.cards[id] } : {}
    });
  } 

  closeModal = () => {
    this.setState({ 
      showModal: false,
      card: {},
    });
  }

  saveCard = (card) => {
    const { cards } = this.props;
    const id = card.id;
    delete card.id;

    this.props.saveCards(
      id >= 0 
        ? [...cards.slice(0, id), card, ...cards.slice(id + 1)]
        : [...cards, card]
    );
    this.setState({ showModal: false });
  }

  deleteCard = (i) => {
    const { cards } = this.props;
    this.props.saveCards([
      ...cards.slice(0, i), 
      ...cards.slice(i + 1)
    ]);
  }

  componentDidMount() {
    this.props.loadCards();
  }

  render() {
    const { cards } = this.props;
    const { showModal, card = {} } = this.state;
console.log('presenter.render card', card);
    return (
      <div className="wrapper">
        <Header addCard={ () => this.openModal() } />
        <div className='content-wrapper'>
          <Container cards={ cards } deleteCard={ this.deleteCard } editCard={ this.openModal } />
          { 
            showModal 
              ? <Form closeModal={ this.closeModal } saveCard={ this.saveCard } { ...card } />
              : null
          }
        </div>
      </div>
    )
  }
}

export default Presenter;
