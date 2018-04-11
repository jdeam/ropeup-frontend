import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import './Dashboard.css';

const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET;
const UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL;

class DashboardImage extends Component {
  state = {
    uploadedFileUrl: ''
  };

  onImageDrop = (files) => {
    console.log(files);
    this.setState({ uploadededFile: files[0] });
    // this.handleImageUpload(files[0]);
  }

  handleImageUpload = (file) => {
    console.log(UPLOAD_URL);
    console.log(UPLOAD_PRESET);
    let upload = request.post(UPLOAD_URL)
      .field('upload_preset', UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) console.error(err);
      if (response.body.secure_url !== '') this.setState({
        uploadedFileUrl: response.body.secure_url
      });
    });
  };

  getUserAge = () => {
    const { user } = this.props;
    if (!user.dob) return '';
    return `, ${moment().diff(user.dob, 'years', false)}`;
  };

  render() {
    const { user } = this.props;
    return (
      <div className="dashboard-image-container">
        {
          user.img_url ? (
            <div className="image is-128x128">
              <img
                src={ user.img_url }
                className="dashboard-image"
                alt=""
              />
            </div>
          ) : (
            <div className="image is-128x128">
              <Dropzone
                className="dashboard-dropzone"
                multiple={ false }
                accept="image/jpg,image/png"
                onDrop={ this.onImageDrop }
              >
                <FontAwesome
                  className="fa-4x"
                  name="cloud-upload"
                />
              </Dropzone>
            </div>
          )
        }
        <div className="title is-4 dashboard-image-name">
          { `${user.first_name}${this.getUserAge()}` }
        </div>
      </div>
    );
  }
}

export default DashboardImage;
