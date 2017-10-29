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
          <Container cards={ cards } />
          { 
            showModal 
              ? <Form closeModal={ this.closeModal } />
              : null
          }
        </div>
      </div>
    )
  }
}

export default Presenter;
