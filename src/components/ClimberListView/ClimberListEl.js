import React from 'react';
import moment from 'moment';
import zipcodes from 'zipcodes';
import grades from '../../util/grades';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import './ClimberList.css';

const ClimberListEl = ({ user, climber }) => {
  const name = `${climber.first_name} ${climber.last_name[0]}.`
  const age = moment().diff(climber.dob, 'years', false);
  const distance = zipcodes.distance(user.zip, climber.zip);
  const match = `${(climber.match * 100).toFixed(0)}% Match`;
  const gradeRange = `${grades[climber.grade_low]}-${grades[climber.grade_high]}`;

  return (
    <Link to={ `/climbers/${climber.id}` }>
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
            <p className="is-size-7 climber-match">{ match }</p>
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
              { climber.lead ? <span className="tag lead-tag is-dark">Lead</span> : <span></span> }
              { climber.tr ? <span className="tag tr-tag is-dark">Toprope</span> : <span></span> }
            </div>
            <div className="climber-grade-range">
              { gradeRange }
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ClimberListEl;
