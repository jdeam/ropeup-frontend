import React, { Component } from 'react';
import moment from 'moment';
import './Dashboard.css';

class DashboardImage extends Component {

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
            <div className="image is-128x128 dashboard-image-is-empty">
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
