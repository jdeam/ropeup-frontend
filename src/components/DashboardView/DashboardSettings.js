import React from 'react';
import './Dashboard.css';

const DashboardSettings = ({ isActive, user }) => {

  return isActive ? (
    <div>
      Settings
    </div>
  ) : (
    <div></div>
  );
}

export default DashboardSettings;
