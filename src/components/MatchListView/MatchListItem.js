import React from 'react';
import moment from 'moment';
import zipcodes from 'zipcodes';
import grades from '../../util/grades';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import './MatchList.css';

const MatchListItem = ({ match, zip }) => {
  const name = `${match.first_name} ${match.last_name[0]}.`;
  const age = moment().diff(match.dob, 'years', false);
  const distance = zipcodes.distance(zip, match.zip);
  const matchRating = `${(match.match * 100).toFixed(0)}% Match`;
  const interests = <span className="tag is-rounded is-dark">{
    match.tr && match.lead ? 'TR & Lead' :
    match.tr ? 'TR only' : 'Lead only'
  }</span>;
  const gradeRange = `${grades[match.grade_low]}-${grades[match.grade_high]}`;

  return (
    <Link to={ `/matches/${match.id}` }>
      <div className="matchlist-box-container">
        <div className="matchlist-box">
          <div className="matchlist-box-left">
            <div className="image is-48x48">
              <img
                src={ match.img_url }
                className="matchlist-img"
                alt=""
              />
            </div>
            <p className="is-size-7 matchlist-rating">{ matchRating }</p>
          </div>
          <div className="matchlist-box-center">
            <div className="matchlist-details">
              <div className="title is-5">
                { name }
              </div>
              <div className="matchlist-age">&nbsp;{ age }
              </div>
            </div>
            <div className="matchlist-location">
              <small>
                <FontAwesome name="map-marker" />&nbsp;
                { distance ? `${distance} mi. away` : '<1 mi. away' }
              </small>
            </div>
          </div>
          <div className="matchlist-box-right">
            <div className="matchlist-graderange">
              { gradeRange }
            </div>
            <div className="matchlist-interests">
              { interests }
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MatchListItem;
