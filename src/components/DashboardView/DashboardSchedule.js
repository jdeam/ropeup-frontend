import React from 'react';
import './Dashboard.css';

const DashboardSchedule = ({ isActive }) => {

  return isActive ? (
    <div>
      Schedule
    </div>
  ) : (
    <div></div>
  );
}

export default DashboardSchedule;
