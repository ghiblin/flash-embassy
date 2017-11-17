import React from 'react';
import PropTypes from 'prop-types';
//import Header from './header';
import Header from '../Header';
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
      card: this.props.cards.filter(el => el.id === id)[0] || {}
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

  componentDidMount() {
    this.props.loadCards();
  }

  render() {
    const { cards } = this.props;
    const { showModal, card = {} } = this.state;
    return (
      <div className="wrapper">
        <Header 
          title={ <span><i className="fa fa-book" aria-hidden="true"></i>&nbsp;Dictionary</span> } 
          buttons={[ <span className="fa fa-plus" onClick={ () => this.openModal() } /> ]}
        />
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
// <Header addCard={ () => this.openModal() } />
Presenter.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    italian: PropTypes.string.isRequired,
    english: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['noun', 'verb', 'adjective', 'adverb', 'conjuction', 'interjuction']),
    ok: PropTypes.number,
    fail: PropTypes.number,
  })),
  saveCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
}

export default Presenter;
