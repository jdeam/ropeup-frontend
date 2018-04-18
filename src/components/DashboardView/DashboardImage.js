import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import { BounceLoader } from 'react-spinners';
import { updateImgUrl, sbAddUserImage } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Dashboard.css';

const BaseURL = process.env.REACT_APP_BASE_URL;
const uploadUrl = process.env.REACT_APP_CLOUDINARY_UPLOAD_URL;
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

class DashboardImage extends Component {
  state = {
    isUploading: false,
  };

  handleImageUpload = (files) => {
    this.setState({ isUploading: true })
    request.post(uploadUrl)
      .field('upload_preset', uploadPreset)
      .field('file', files[0])
      .end(async (err, res) => {
        if (err) console.log(err);
        const { secure_url } = res.body;
        if (secure_url) {
          this.setState({ isUploading: false });
          this.updateUserImage(secure_url);
        }
      });
  };

  updateUserImage = async (img_url) => {
    const updateBody = { img_url };
    const { token, user, updateImgUrl, sbAddUserImage } = this.props;
    const response = await axios.patch(
      `${BaseURL}/users/${user.id}`,
      updateBody,
      { headers: { token } }
    );
    if (response.status === 200) {
      updateImgUrl(img_url);
      sbAddUserImage();
    }
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
                accept="image/*"
                onDrop={ this.handleImageUpload }
              >
                { this.state.isUploading ? (
                  <BounceLoader
                    color={'#5BCDB3'}
                    size={126}
                  />
                ) : (
                  <FontAwesome
                    className="fa-4x dashboard-fa-cloud"
                    name="cloud-upload"
                  />
                ) }
              </Dropzone>
            </div>
          )
        }
        <div className="title is-4 dashboard-image-name">
          { user.username }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateImgUrl,
  sbAddUserImage,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardImage);
