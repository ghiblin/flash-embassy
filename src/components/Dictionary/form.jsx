import React from 'react';
import PropTypes from 'prop-types';
import './form.scss';

import { RadioGroup, Radio } from '../Radio';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      italian: props.italian || '',
      english: props.english || '',
      type: props.type || '',
      ok: props.ok || 0,
      fail: props.fail || 0,
      showError: false,
    };
  }

  onInputChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }

  onRadioChange = (value) => {
    this.setState({
      type: value,
    });
  }

  hideError = () => {
    this.setState({ showError: false });
  }

  submitForm = () => {
    const {
      id,
      italian,
      english,
      type,
    } = this.state;

    if (!!italian && !!english && !!type) {
      this.props.saveCard({
        id,
        italian,
        english,
        type,
      });
    } else {
      this.setState({ showError: true });
    }
  }

  render() {
    const {
      id,
      italian,
      english,
      showError,
      type,
      ok,
      fail,
    } = this.state;
    const isNew = !id;
    const errorMessage = showError ? 'Please fill all fields' : '';

    return (
      <div className="create-card">
        <div className="create-card__shadow" onClick={this.props.closeModal} />
        <div className="create-card__body">
          <h1>{isNew ? 'Create New Card' : 'Update Card'}</h1>
          <div className="create-card__input-wrapper">
            <span className="flag_it" />
            <input
              name="italian"
              placeholder="Enter a new Word"
              value={italian}
              onChange={this.onInputChange}
            />
            <br />
            <span className="flag_uk" />
            <input
              name="english"
              placeholder="Enter a translation"
              value={english}
              onChange={this.onInputChange}
            />
            <br />
            <RadioGroup
              className="types"
              name="type"
              selectedValue={type}
              onChange={this.onRadioChange}
            >
              <label htmlFor="noun">
                <Radio value="noun" />noun
              </label>
              <label htmlFor="verb">
                <Radio value="verb" />verb
              </label>
              <br />
              <label htmlFor="adjective">
                <Radio value="adjective" />adjective
              </label>
              <label htmlFor="adverb">
                <Radio value="adverb" />adverb
              </label>
              <br />
              <label htmlFor="conjuction">
                <Radio value="conjuction" />conjuction
              </label>
              <label htmlFor="interjuction">
                <Radio value="interjuction" />interjuction
              </label>
            </RadioGroup>
            <br />
            <div className="results">
              <span style={{ marginRight: 10 }}>
                <b>{ ok }</b>&nbsp;
                <i className="fa fa-thumbs-up" />
              </span>
              <span style={{ marginLeft: 10 }}>
                <b>{ fail }</b>&nbsp;
                <i className="fa fa-thumbs-down" />
              </span>
            </div>
            <br />
            <div className="create-card__error">
              { errorMessage }
            </div>
            <button
              className="create-card__button"
              onClick={this.submitForm}
            >
              {isNew ? 'Create!' : 'Save!'}
            </button>&nbsp;
            <button
              className="create-card__button"
              onClick={this.props.closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Form.propTypes = {
  id: PropTypes.string,
  italian: PropTypes.string,
  english: PropTypes.string,
  type: PropTypes.string,
  ok: PropTypes.number,
  fail: PropTypes.number,
  saveCard: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

Form.defaultProps = {
  italian: '',
  english: '',
  type: 'noum',
  ok: 0,
  fail: 0,
};

export default Form;
