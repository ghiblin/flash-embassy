import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Container from './container';

class Presenter extends React.Component {
  componentDidMount() {
    this.props.loadCards();
  }

  render() {
    const { cards, saveCards } = this.props;

    return (
      <div className="wrapper">
        <Header title={<span><i className="fa fa-cog" aria-hidden="true" />&nbsp;Training</span>} />
        <div className="content-wrapper">
          <Container cards={cards} onFinish={saveCards} />
        </div>
      </div>
    );
  }
}

Presenter.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    italian: PropTypes.string.isRequired,
    english: PropTypes.string.isRequired,
  })).isRequired,
  loadCards: PropTypes.func.isRequired,
  saveCards: PropTypes.func.isRequired,
};

export default Presenter;
