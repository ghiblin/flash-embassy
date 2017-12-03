import React from 'react';

import './styles.scss';

class FileUploader extends React.Component {
  state = {
    hover: false,
  }

  onMouseEnter = () => {
    this.setState({
      hover: true,
    });
  }

  onMouseLeave = () => {
    this.setState({
      hover: false,
    });
  }

  handleFileChange = (evt) => {
    this.setState({
      file: evt.target.files[0],
    });
  }

  render() {
    const { hover, file } = this.state;
    const name = file ? file.name : '';

    return (
      <div className="FileUploader">
        <form>
          <input type="text" placeholder="Choose a file..." value={name} />
          <span className={`arrow ${hover ? 'hover' : ''}`}>
            <button className={hover ? 'hover' : ''}>Upload</button>
          </span>
          <input
            type="file"
            accept=".json"
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onChange={this.handleFileChange}
            required
          />
        </form>
      </div>
    );
  }
}

export default FileUploader;
