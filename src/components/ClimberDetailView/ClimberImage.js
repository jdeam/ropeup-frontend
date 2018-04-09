import React from 'react';
import moment from 'moment';
import zipcodes from 'zipcodes';
import FontAwesome from 'react-fontawesome';
import './ClimberDetail.css';

const ClimberImage = ({ climber, zip }) => {
  const age = moment().diff(climber.dob, 'years', false);
  const distance = zipcodes.distance(zip, climber.zip);

  return (
    <div className="climber-img-container">
      <div className="image is-128x128">
        <img
          src={ climber.img_url }
          className="climber-img"
          alt=""
        />
      </div>
      <div className="climber-name">
        <div>
          <span className="title is-4">
            { `${climber.first_name}, ${age}` }
          </span>
        </div>
        <div className="climberdetail-location">
          <FontAwesome name="map-marker" />&nbsp;
          { distance ? `${distance} mi. away` : '<1 mi. away' }
        </div>
      </div>
    </div>
  );
}

export default ClimberImage;
