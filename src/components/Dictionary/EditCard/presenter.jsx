import React from 'react';
import Form from '../form';

class EditCard extends React.Component {
  saveCard = (card) => {
    this.props.saveCard(card);
    this.props.closeModal();
  }

  render() {
    return (
      <Form closeModal={this.props.closeModal} saveCard={this.saveCard} {...this.props.card} />
    );
  }
}

export default EditCard;
