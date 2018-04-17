import React from 'react';
import { grades } from '../../util/climbing';
import './MatchDetail.css';

const MatchContent = ({ match }) => {
  const interests = <span className="tag is-rounded is-dark">{
    match.tr && match.lead ? 'Toprope & lead' :
    match.tr ? 'Toprope only' : 'Lead only'
  }</span>;

  return (
    <div className="matchdetail-content-container">
      <div className="matchdetail-content">
        <div className="matchdetail-content-header">
          <div className="matchdetail-about-header">About { match.username }</div>
          <div className="matchdetail-year">Climbing since { match.start_year }</div>
        </div>
        <div className="matchdetail-about-content">{ match.about }</div>
        <div className="matchdetail-climbs-at">Climbs at&nbsp;
          <span className="matchdetail-gym">{ match.gym }</span>
        </div>
        <div className="matchdetail-interests">
          { interests }&nbsp;
          <span className="matchdetail-grades">
            from { grades[match.grade_low] } to { grades[match.grade_high] }
          </span>
        </div>
      </div>
    </div>
  );
}

export default MatchContent;
