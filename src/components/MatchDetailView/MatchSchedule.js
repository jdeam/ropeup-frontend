import React from 'react';
import MatchScheduleItem from './MatchScheduleItem';
import { overlapSchedules } from '../../util/schedules';
import { gyms } from '../../util/climbing';
import './MatchDetail.css';

const MatchSchedule = ({
  userSchedule,
  matchSchedule,
  matchGym,
  userGym
}) => {
  const gym = gyms.find(gym => gym.id === matchGym).name;
  const isSameGym = (userGym === matchGym);
  const scheduleItems = overlapSchedules(userSchedule, matchSchedule);
  const scheduleItemEls = scheduleItems.map((item, i) => {
    return <MatchScheduleItem key={ i } item={ item }/>
  });

  return (
    <div className="matchdetail-schedule">
      <div className="matchdetail-schedule-header">
        Matches your schedule on ...
      </div>
      <div className="matchdetail-schedule-tags">
        { scheduleItemEls }
      </div>
      <div className="matchdetail-schedule-gym">
        ...at&nbsp;
        <span className={ isSameGym ? 'matchdetail-is-same-gym' : ''}>
          { gym }
        </span>
      </div>
    </div>
  );
};

export default MatchSchedule;
