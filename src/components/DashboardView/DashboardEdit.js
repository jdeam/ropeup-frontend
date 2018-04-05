import React from 'react';
import './Dashboard.css';

const DashboardEdit = ({ isActive }) => {

  return isActive ? (
    <div>
      Edit
    </div>
  ) : (
    <div></div>
  );
}

export default DashboardEdit;
