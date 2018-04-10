import React from 'react';
import ScheduleItem from './DashboardScheduleItem';
import './Dashboard.css';

const DashboardScheduleList = ({ schedule }) => {

  const itemEls = schedule.map((item, i) => {
    return <ScheduleItem key={ i } item={ item } />
  });

  return schedule.length ? (
    <div className="dashboard-form-item">
      <div className="tags is-centered dashboard-schedule-items">
        { itemEls }
      </div>
    </div>
  ) : (
    <div className="dashboard-empty-schedule-container">
      <div className="dashboard-empty-schedule">
        Your schedule is empty
      </div>
    </div>
  );
};

export default DashboardScheduleList;
