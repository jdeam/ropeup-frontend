import React, { Component } from 'react';
import moment from 'moment';
import './Dashboard.css';

class DashboardImage extends Component {

  getUserAge = () => {
    if (!this.props.user.dob) return '';
    return `, ${moment().diff(this.props.user.dob, 'years', false)}`;
  }

  render() {
    return (
      <div className="dashboard-image-container">
        {
          this.props.user.img_url ? (
            <div className="image is-128x128">
              <img
                src={ this.props.user.img_url }
                className="dashboard-image"
                alt=""
              />
            </div>
          ) : (
            <div className="image is-128x128 dashboard-image-is-empty">
            </div>
          )
        }
        <div className="title is-4 dashboard-image-name">
          { `${this.props.user.first_name}${this.getUserAge()}` }
        </div>
      </div>
    );
  }
}

export default DashboardImage;
