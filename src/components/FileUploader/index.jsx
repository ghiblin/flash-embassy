import React from 'react';
import PropTypes from 'prop-types';

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

  handleUpload = (evt) => {
    evt.preventDefault();
    const { file } = this.state;
    if (file) {
      this.props.upload(file);
    }
  }

  render() {
    const { hover, file } = this.state;
    const name = file ? file.name : '';

    return (
      <div className="FileUploader">
        <div className="FileUploader__shadow" />
        <div className="FileUploader__body">
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
            <div className="FileUploader__actions">
              <button onClick={this.handleUpload}>Ok</button>&nbsp;
              <button onClick={this.props.cancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

FileUploader.propTypes = {
  upload: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};

export default FileUploader;
