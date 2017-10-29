import React from 'react';

class Form extends React.Component {
  state = {
    italian: '',
    english: '',
    showError: false,
  };

  hideError = () => {
    this.setState({ showError: false });
  }

  onInputChange = (e) => {
    this.setState({
      ...this.state,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }

  submitForm = (e) => {

  }

  render() {
    const { italian, english, showError } = this.state;
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
            <label>
              <input type="checkbox" />noun
            </label>
            <label>
              <input type="checkbox" />verb
            </label>
            <br />
            <label>
              <input type="checkbox" />adjective
            </label>
            <label>
              <input type="checkbox" />adverb
            </label>
            <br />
            <label>
              <input type="checkbox" />conjuction
            </label>
            <label>
              <input type="checkbox" />interjuction
            </label>
            <br />
            <button id="create-card__button" onClick={ this.submitForm }>Create!</button>
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