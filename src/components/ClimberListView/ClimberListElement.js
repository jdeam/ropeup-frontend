import React from 'react';
import moment from 'moment';
import zipcodes from 'zipcodes';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import './ClimberList.css';

const ClimberListElement = ({ climber }) => {
  const name = `${climber.first_name} ${climber.last_name[0]}.`
  const age = moment().diff(climber.dob, 'years', false);
  const distance = zipcodes.distance(98103, climber.zip);

  return (
    <Link to={ `/climbers` }>
      <div className="climber-box-container">
        <div className="climber-box">
          <div className="climber-box-left">
            <div className="image is-64x64">
              <img
                src={ climber.img_url }
                className="climber-img"
                alt=""
              />
            </div>
            <p className="is-size-7 climber-match">85% Match</p>
          </div>
          <div className="climber-box-center">
            <div className="climber-details">
              <div className="title is-5">
                { name }
              </div>
              <div className="climber-age">&nbsp;{ age }
              </div>
            </div>
            <div className="climber-location">
              <FontAwesome name="location-arrow" />
              <small>&nbsp;{ `${distance} mi. away` }</small>
            </div>
          </div>
          <div className="climber-box-right">
            <div className="climber-interests">
              <span className="tag is-info">Lead</span>
              <span className="tag is-info">Toprope</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ClimberListElement;
