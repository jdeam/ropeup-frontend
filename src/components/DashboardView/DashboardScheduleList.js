import React from 'react';
import ScheduleItem from './DashboardScheduleItem';
import './Dashboard.css';

const DashboardScheduleList = ({ schedule }) => {

  const itemEls = schedule.map((item, i) => {
    return <ScheduleItem key={ i } item={ item } />
  });

  return (
    schedule.length ? (
      <div className="dashboard-form-item">
        <div className="tags is-centered schedule-items">
          { itemEls }
        </div>
      </div>
    ) : (
      <div className="empty-container">
        <div className="empty-schedule">
          Your schedule is empty
        </div>
      </div>
    )
  );
};

export default DashboardScheduleList;
