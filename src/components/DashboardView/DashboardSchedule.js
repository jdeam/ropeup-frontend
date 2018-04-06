import React from 'react';
import './Dashboard.css';

const DashboardSchedule = ({ isActive, user }) => {

  return isActive ? (
    <div className="dashboard-schedule-container">
      Schedule
    </div>
  ) : (
    <div></div>
  );
}

export default DashboardSchedule;
