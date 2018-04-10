import React from 'react';
import MatchScheduleItem from './MatchScheduleItem';
import './MatchDetail.css';

const MatchSchedule = ({ userSched, matchSched }) => {
  const scheduleItemEls = matchSched.filter(item => {
    for (let time=item.start; time<item.end; time++) {
      if (parseInt(userSched[item.day][time], 10)) return true;
    }
    return false;
  }).map((item, i) => {
    let { day, start, end } = item;
    while (!parseInt(userSched[day][start], 10)) start++;
    while (!parseInt(userSched[day][end-1], 10)) end--;
    return <MatchScheduleItem
      key={ i }
      item={ { day, start, end} }
    />
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
}

export default MatchSchedule;
