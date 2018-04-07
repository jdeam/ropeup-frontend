import React, { Component } from 'react';
import moment from 'moment';
import './Dashboard.css';

class DashboardImage extends Component {

  getAge = () => {
    if (!this.props.user.dob) return '';
    return `, ${moment().diff(this.props.user.dob, 'years', false)}`;
  }

  render() {
    return (
      <div className="dashboard-img-container">
        {
          this.props.user.img_url ? (
            <div className="image is-128x128">
              <img
                src={ this.props.user.img_url }
                className="dashboard-img"
                alt=""
              />
            </div>
          ) : (
            <div className="image is-128x128 is-empty">

            </div>
          )
        }
        <div className="title is-4 dashboard-name">
          { `${this.props.user.first_name}${this.getAge()}` }
        </div>
      </div>
    );
  }
}

export default DashboardImage;
