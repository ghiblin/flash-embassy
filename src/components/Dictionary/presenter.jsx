/* global File */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { saveAs } from 'file-saver';
import Header from '../Header';
import SearchBar from '../SearchBar';
import IconButton from '../IconButton';
import Container from './container';
import NewCard from './NewCard';
import EditCard from './EditCard';
import UploadCards from './Upload';

const filterCards = (cards, term) => (
  cards.filter(card => (
    card.italian.search(new RegExp(term, 'gi')) >= 0 ||
    card.english.search(new RegExp(term, 'gi')) >= 0
  ))
);

export default class Presenter extends React.Component {
  state = {
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

  render() {
    const {
      currentlyDisplayed,
      searchTerm,
    } = this.state;
    return (
      <div className="wrapper">
        <Header
          title={<span><i className="fa fa-book" aria-hidden="true" />&nbsp;Dictionary</span>}
          buttons={[
            <SearchBar searchTerm={searchTerm} onInputChange={this.filterList} />,
            <IconButton className="upload" icon="upload" onClick={this.props.uploadCards} />,
            <IconButton className="download" icon="download" onClick={this.downloadCards} />,
            <IconButton className="plus" icon="plus" onClick={this.props.newCard} />,
          ]}
        />
        <div className="content-wrapper">
          <Switch>
            <Route
              path="/dictionary"
              exact
              render={() => (
                <Container
                  cards={currentlyDisplayed}
                  deleteCard={this.deleteCard}
                  editCard={this.openModal}
                />
              )}
            />
            <Route path="/dictionary/new" component={NewCard} />
            <Route path="/dictionary/upload" component={UploadCards} />
            <Route path="/dictionary/:id" render={({ match }) => <EditCard id={match.params.id} />} />
          </Switch>
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
  deleteCard: PropTypes.func.isRequired,
  newCard: PropTypes.func.isRequired,
  uploadCards: PropTypes.func.isRequired,
};
/*
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
*/
Presenter.defaultProps = {
  cards: [],
};
