import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import { fetchUser } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import './Dashboard.css';

const BaseURL = process.env.REACT_APP_BASE_URL;
const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET;
const UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL;

class DashboardImage extends Component {
  onDrop = (files) => {
    this.setState({ uploadedFile: files[0] });
    this.handleImageUpload(files[0]);
  }

  handleImageUpload = (file) => {
    const upload = request.post(UPLOAD_URL)
      .field('upload_preset', UPLOAD_PRESET)
      .field('file', file)
      .end( async (err, res) => {
        if (err) console.log(err);
        if (res.body.secure_url) {
          const uploadBody = { img_url: res.body.secure_url };
          const { token, user, fetchUser } = this.props;
          const response = await axios.patch(
            `${BaseURL}/users/${user.id}`,
            uploadBody,
            { headers: { token } }
          );
          if (response.status === 200) fetchUser();
        }
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
                accept="image/*"
                onDrop={ this.onDrop }
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

const mapStateToProps = (state) => ({
  token: state.token,
  user: state.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchUser
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardImage);
