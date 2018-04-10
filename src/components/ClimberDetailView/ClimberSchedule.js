import React from 'react';
import ClimberScheduleItem from './ClimberScheduleItem';
import './ClimberDetail.css';

const ClimberSchedule = ({ userSched, climberSched, gyms }) => {
  const scheduleItemEls = climberSched.filter(item => {
    for (let time=item.start; time<item.end; time++) {
      if (parseInt(userSched[item.day][time], 10)) return true;
    }
    return false;
  }).map((item, i) => {
    let { day, start, end } = item;
    while (!parseInt(userSched[day][start], 10)) start++;
    while (!parseInt(userSched[day][end-1], 10)) end--;
    return <ClimberScheduleItem
      key={ i }
      item={ { day, start, end} }
    />
  });

  return (
    <div className="climberdetail-schedule">
      <div className="climberdetail-match-message">
        Matches your schedule on ...
      </div>
      <div className="tags is-centered">
        { scheduleItemEls }
      </div>
    </div>
  );
}

export default ClimberSchedule;
