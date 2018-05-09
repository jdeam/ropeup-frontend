import React from 'react';
import zipcodes from 'zipcodes';
import grades from '../../util/grades';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import './MatchList.css';

const MatchListItem = ({ match, zip }) => {
  const { 
    username, 
    matchRating, 
    tr, 
    lead, 
    grade_low, 
    grade_high 
  } = match;
  const distance = zipcodes.distance(zip, match.zip);
  const rating = `${(matchRating * 100).toFixed(0)}% Match`;
  const interests = <span className="tag is-dark">{
    tr && lead ? 'TR & Lead' :
    tr ? 'TR only' : 'Lead only'
  }</span>;
  const gradeRange = `${grades[grade_low]}-${grades[grade_high]}`;

  return (
    <Link to={ `/matches/${username}` }>
      <div className="matchlist-box-container">
        <div className="matchlist-box">
          <div className="matchlist-box-left">
            <div className="image is-64x64">
              <img
                src={ match.img_url }
                className="matchlist-img"
                alt=""
              />
            </div>
          </div>
          <div className="matchlist-box-center">
            <div className="matchlist-details">
              <div className="title is-4">
                { username }
              </div>
            </div>
            <div className="matchlist-location">
              <small>
                <FontAwesome name="map-marker" />&nbsp;
                { distance ? `${distance} mi. away` : '<1 mi. away' }
              </small>
            </div>
            <div className="is-size-7 matchlist-rating">{ rating }</div>
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
