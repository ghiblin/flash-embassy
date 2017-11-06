import React from 'react';
import Header from './header';
import Container from './container';
import Form from './form';

class Presenter extends React.Component {
  state = {
    showModal: false,
  }

  openModal = () => {
    this.setState({ showModal: true });
  } 

  closeModal = () => {
    this.setState({ showModal: false });
  }

  saveCard = (card) => {
    const { cards } = this.props;
    this.props.saveCards([...cards, card]);
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
    const { showModal } = this.state;

    return (
      <div className="wrapper">
        <Header addCard={ this.openModal } />
        <div className='content-wrapper'>
          <Container cards={ cards } deleteCard={ this.deleteCard } />
          { 
            showModal 
              ? <Form closeModal={ this.closeModal } saveCard={ this.saveCard } />
              : null
          }
        </div>
      </div>
    )
  }
}

export default Presenter;
