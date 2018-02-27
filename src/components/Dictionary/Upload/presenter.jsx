/* global FileReader, alert */
import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class FileUploader extends React.Component {
  state = {
    hover: false,
    url: '',
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

  handleOnChange = (evt) => {
    evt.preventDefault();
    this.setState({
      url: evt.target.value,
    });
  }

  onOk = (evt) => {
    evt.preventDefault();
    const { file, url } = this.state;
    if (file) {
      this.handleUpload(file);
    } else if (!!url) {
      this.fetchJSON(url);
    }
  }

  handleUpload(file) {
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

  fetchJSON(url) {
    fetch(url)
      .then(res => res.json)
      .then(this.props.upload)
      .catch(err => {
        alert('Error fetching remote json:' + err);
      });
  }

  render() {
    const { hover, file } = this.state;
    const name = file ? file.name : '';

    return (
      <div className="FileUploader">
        <div className="FileUploader__body">
          <form>
            <div className="form-control">
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
            </div>
            <div className="form-control">
              <select onChange={this.handleOnChange} value={this.state.url}>
                <option value="">-- Select one --</option>
                { this.props.remoteDicts.map((d, i) => <option key={i} value={d.url}>{d.label}</option>) }
              </select>
            </div>
            <div className="FileUploader__actions">
              <button onClick={this.onOk}>Ok</button>&nbsp;
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
  remoteDicts: PropTypes.array.isRequired,
};

export default FileUploader;
