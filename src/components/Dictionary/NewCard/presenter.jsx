import React from 'react';
import Form from '../form';

class NewCard extends React.Component {
  saveCard = (card) => {
    console.log('saveCard', card);
    this.props.saveCard(card);
    this.props.closeModal();
  }

  render() { 
    return (
      <Form closeModal={this.props.closeModal} saveCard={this.saveCard} id={null} />
    );
  }
}

export default NewCard;
