/* global File, FileReader, alert */
import React from 'react';
import PropTypes from 'prop-types';

import { saveAs } from 'file-saver';

import Header from '../Header';
import SearchBar from '../SearchBar';
import IconButton from '../IconButton';
import Container from './container';
import Form from './form';
import FileUploader from '../FileUploader';

function filterCards(cards, term) {
  return cards.filter(card => (
    card.italian.search(new RegExp(term, 'gi')) >= 0 ||
    card.english.search(new RegExp(term, 'gi')) >= 0
  ));
}

export default class Presenter extends React.Component {
  state = {
    showModal: false,
    card: {},
    searchTerm: '',
    currentlyDisplayed: [],
  }

  componentWillMount() {
    this.props.loadCards();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentlyDisplayed: filterCards(nextProps.cards, this.state.searchTerm),
    });
  }

  openModal = (id) => {
    this.setState({
      showModal: 'form',
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

  filterList = (evt) => {
    const { value } = evt.target;
    const currentlyDisplayed = filterCards(this.props.cards, value);
    this.setState({
      searchTerm: value,
      currentlyDisplayed,
    });
  }

  showUploadForm = () => {
    this.setState({
      showModal: 'upload',
    });
  }

  downloadCards = () => {
    const content = JSON.stringify(this.props.cards.map(c => ({
      italian: c.italian,
      english: c.english,
      type: c.type,
    })));
    const file = new File(
      [content],
      'cards.json',
      { type: 'application/json;charset=utf-8' },
    );
    saveAs(file);
  }

  uploadCards = (file) => {
    try {
      const fr = new FileReader();
      fr.onload = () => {
        this.props.addCards(JSON.parse(fr.result));
      };
      fr.onerror = (e) => {
        // eslint-disable-next-line no-alert
        alert(`Error reading JSON file. ${e}`);
      };
      fr.readAsText(file);
    } catch (ex) {
      // eslint-disable-next-line
      alert('Error parsing JSON file:' + ex);
    }
    this.setState({ showModal: false });
  }

  render() {
    const {
      currentlyDisplayed,
      searchTerm,
      showModal,
      card = {},
    } = this.state;
    return (
      <div className="wrapper">
        <Header
          title={<span><i className="fa fa-book" aria-hidden="true" />&nbsp;Dictionary</span>}
          buttons={[
            <SearchBar searchTerm={searchTerm} onInputChange={this.filterList} />,
            <IconButton className="upload" icon="upload" onClick={this.showUploadForm} />,
            <IconButton className="download" icon="download" onClick={this.downloadCards} />,
            <IconButton icon="plus" onClick={() => this.openModal()} />,
          ]}
        />
        <div className="content-wrapper">
          <Container
            cards={currentlyDisplayed}
            deleteCard={this.deleteCard}
            editCard={this.openModal}
          />
          {
            showModal === 'form'
              ? <Form closeModal={this.closeModal} saveCard={this.saveCard} {...card} />
              : null
          }
          {
            showModal === 'upload'
              ? <FileUploader upload={this.uploadCards} cancel={this.closeModal} />
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
  addCards: PropTypes.func.isRequired,
  saveCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
};

Presenter.defaultProps = {
  cards: [],
};
