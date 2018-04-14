import React from 'react';
import MatchScheduleItem from './MatchScheduleItem';
import { overlapSchedules } from '../../util/schedules';
import './MatchDetail.css';

const MatchSchedule = ({ userSchedule, matchSchedule }) => {
  const scheduleItems = overlapSchedules(userSchedule, matchSchedule);
  const scheduleItemEls = scheduleItems.map((item, i) => {
    return <MatchScheduleItem key={ i } item={ item }/>
  });

  return (
    <div className="matchdetail-schedule">
      <div className="matchdetail-schedule-header">
        Matches your schedule on ...
      </div>
      <div className="tags is-centered">
        { scheduleItemEls }
      </div>
    </div>
  );
};

export default MatchSchedule;
