import React from 'react';
import { grades, gyms } from '../../util/climbing';
import './MatchDetail.css';

const MatchContent = ({ match }) => {
  const gym = gyms.find(gym => gym.id === match.gym).name;
  const interests = <span className="tag is-rounded is-dark">{
    match.tr && match.lead ? 'Toprope & lead' :
    match.tr ? 'Toprope only' : 'Lead only'
  }</span>;

  return (
    <div className="matchdetail-content-container">
      <div className="matchdetail-content">
        <div className="content">
          <p>{ match.about }</p>
        </div>
        {/* <div className="matchdetail-climbs-at">Climbs at&nbsp;
          <span className="matchdetail-gym">{ gym }</span>
        </div>
        <div className="matchdetail-interests">
          { interests }&nbsp;
          <span className="matchdetail-grades">
            from { grades[match.grade_low] } to { grades[match.grade_high] }
          </span>
        </div> */}
      </div>
    </div>
  );
}

export default MatchContent;
