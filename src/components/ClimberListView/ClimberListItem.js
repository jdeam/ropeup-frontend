import React from 'react';
import moment from 'moment';
import zipcodes from 'zipcodes';
import grades from '../../util/grades';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import './ClimberList.css';

const ClimberListItem = ({ climber, zip }) => {
  const name = `${climber.first_name} ${climber.last_name[0]}.`;
  const age = moment().diff(climber.dob, 'years', false);
  const distance = zipcodes.distance(zip, climber.zip);
  const match = `${(climber.match * 100).toFixed(0)}% Match`;
  const interests = <span className="tag is-rounded is-dark">{
    climber.tr && climber.lead ? 'TR & Lead' :
    climber.tr ? 'TR only' : 'Lead only'
  }</span>;
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
              <small>
                <FontAwesome name="map-marker" />&nbsp;
                { distance ? `${distance} mi. away` : '<1 mi. away' }
              </small>
            </div>
          </div>
          <div className="climber-box-right">
            <div className="climber-interests">
              { interests }
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

export default ClimberListItem;
