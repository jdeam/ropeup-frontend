import React from 'react';
import zipcodes from 'zipcodes';
import FontAwesome from 'react-fontawesome';
import './MatchDetail.css';

const MatchImage = ({ match, zip }) => {
  const distance = zipcodes.distance(zip, match.zip);

  return (
    <div className="matchdetail-img-container">
      <div className="image is-128x128">
        <img
          src={ match.img_url }
          className="matchdetail-img"
          alt=""
        />
      </div>
      <div className="matchdetail-name">
        <div>
          <span className="title is-4">
            { match.username }
          </span>
        </div>
        <div className="matchdetail-location">
          <FontAwesome name="map-marker" />&nbsp;
          { distance ? `${distance} mi. away` : '<1 mi. away' }
        </div>
      </div>
    </div>
  );
}

export default MatchImage;
