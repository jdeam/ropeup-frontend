import React from 'react';
import ScheduleItem from './DashboardScheduleItem';
import FontAwesome from 'react-fontawesome';
import './Dashboard.css';

const DashboardScheduleList = ({ schedule, fetchingSchedule }) => {
  const itemEls = schedule.map((item, i) => {
    return <ScheduleItem key={ i } item={ item } />
  });

  return fetchingSchedule ? (
    <div className="dashboard-schedule-empty-container">
      <div className="dashboard-schedule-empty">
        <FontAwesome className="fa-2x fa-spin" name="spinner" />
      </div>
    </div>
  ) : schedule.length ? (
    <div className="dashboard-form-item">
      <div className="tags is-centered dashboard-schedule">
        { itemEls }
      </div>
    </div>
  ) : (
    <div className="dashboard-schedule-empty-container">
      <div className="dashboard-schedule-empty">
        Your schedule is empty
      </div>
    </div>
  );
};

export default DashboardScheduleList;
