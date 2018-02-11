/* global FileReader, alert */
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
      try {
        const fr = new FileReader();
        fr.onload = () => {
          this.props.upload(JSON.parse(fr.result));
          this.props.cancel();
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
    }
  }

  render() {
    const { hover, file } = this.state;
    const name = file ? file.name : '';

    return (
      <div className="FileUploader">
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
