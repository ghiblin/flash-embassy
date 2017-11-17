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

  hideError = () => {
    this.setState({ showError: false });
  }

  onInputChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }

  onRadioChange = (value) => {
    this.setState({
      type: value
    });
  }

  submitForm = (e) => {
    const { id, italian, english, type } = this.state;

    if (!!italian && !!english && !!type) {
      this.props.saveCard({ id, italian, english, type });
    } else {
      this.setState({ showError: true });
    }
  }

  render() {
    const { id, italian, english, showError, type, ok, fail } = this.state;
    const isNew = !id;
    const errorMessage = showError ? 'Please fill all fields' : '';

    return (
      <div className='create-card'>
        <div className='create-card__shadow' onClick={ this.props.closeModal } />
        <div className='create-card__body'>
          <h1>{isNew ? 'Create New Card' : 'Update Card'}</h1>
          <div className="create-card__input-wrapper">
            <span className="flag_it" />
            <input name='italian'
                  placeholder='Enter a new Word'
                  value={italian}
                  onChange={ this.onInputChange }
            />
            <br />
            <span className="flag_uk" />
            <input name='english'
                  placeholder='Enter a translation'
                  value={english}
                  onChange={ this.onInputChange }
            />
            <br />
            <RadioGroup name="type" selectedValue={type} onChange={ this.onRadioChange }>
              <label>
                <Radio value="noun" />noun
              </label>
              <label>
                <Radio value="verb" />verb
              </label>
              <br />
              <label>
                <Radio value="adjective" />adjective
              </label>
              <label>
                <Radio value="adverb" />adverb
              </label>
              <br />
              <label>
                <Radio value="conjuction" />conjuction
              </label>
              <label>
                <Radio value="interjuction" />interjuction
              </label>
            </RadioGroup>
            <br />
            <span style={{ marginRight: 10 }}>
              <b>{ ok }</b>&nbsp;
              <i className="fa fa-thumbs-up"></i>
            </span>
            <span style={{ marginLeft: 10 }}>
              <b>{ fail }</b>&nbsp;
              <i className="fa fa-thumbs-down"></i>
            </span>
            <br/>
            <button className="create-card__button" onClick={ this.submitForm }>{ (id >= 0) ? 'Save!' : 'Create!' }</button>&nbsp;
            <button className="create-card__button" onClick={ this.props.closeModal }>Cancel</button>
            <div className='create-card__error'>
              { errorMessage }
            </div>
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
  type: PropTypes.oneOf(['noun', 'verb', 'adjective', 'adverb', 'conjunction', 'interjuction']),
  ok: PropTypes.number,
  fail: PropTypes.number,
  saveCard: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Form;