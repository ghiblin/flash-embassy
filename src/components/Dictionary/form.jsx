import React from 'react';
//import './form.scss';

import { RadioGroup, Radio } from '../Radio';

class Form extends React.Component {
  state = {
    italian: '',
    english: '',
    showError: false,
    type: '',
  };

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
    const { italian, english, type } = this.state;
    if (!!italian && !!english && !!type) {
      this.props.saveCard({
        italian, english, type
      });
    } else {
      this.setState({ showError: true });
    }
  }

  render() {
    const { italian, english, showError, type } = this.state;
    const errorMessage = showError ? 'Please fill all fields' : '';

    return (
      <div className='create-card'>
        <div className='create-card__shadow' onClick={ this.props.closeModal } />
        <div className='create-card__body'>
          <h1>Create New Card</h1>
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
            <button className="create-card__button" onClick={ this.submitForm }>Create!</button>&nbsp;
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

export default Form;