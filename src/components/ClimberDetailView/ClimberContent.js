import React from 'react';
import grades from '../../util/grades';
import './ClimberDetail.css';

const ClimberContent = ({ climber }) => {
  const interests = <span className="tag is-rounded is-dark">{
    climber.tr && climber.lead ? 'Toprope & lead' :
    climber.tr ? 'Toprope only' : 'Lead only'
  }</span>;

  return (
    <div className="climberdetail-content-container">
      <div className="climberdetail-content">
        <div className="climberdetail-content-header">
          <div className="climberdetail-about-header">About { climber.first_name }</div>
          <div className="climberdetail-year">Climbing since { climber.start_year }</div>
        </div>
        <div className="climberdetail-about-content">{ climber.about }</div>
        <div className="climberdetail-climbs-at">Climbs at&nbsp;
          <span className="climberdetail-gyms">{ climber.gyms }</span>
        </div>
        <div className="climberdetail-interests">
          { interests }&nbsp;
          <span className="climberdetail-grades">
            from { grades[climber.grade_low] } to { grades[climber.grade_high] }
          </span>
        </div>
      </div>
    </div>
  );
}

export default ClimberContent;
