import React from 'react';
import { grades } from '../../util/climbing';
import './MatchDetail.css';

const MatchContent = ({ match }) => {
  const interests = <span className="tag is-rounded is-dark">{
    match.tr && match.lead ? 'TR & lead' :
    match.tr ? 'TR only' : 'Lead only'
  }</span>;

  return (
    <div className="matchdetail-content-container">
      <div className="matchdetail-content">
        <div className="content matchdetail-about">
          <p>{ match.about }</p>
        </div>
        <div className="matchdetail-climberprofile">
          <div className="climberprofile-start-year">
            Climbing since&nbsp;{ match.start_year }
          </div>
          <div className="climberprofile-interests">
            { interests }
          </div>
          <div className="climberprofile-graderange">
            { `${grades[match.grade_low]} - ${grades[match.grade_high]}` }
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchContent;
