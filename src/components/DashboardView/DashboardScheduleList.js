import React from 'react';
import ScheduleItem from './DashboardScheduleItem';
import { BarLoader } from 'react-spinners';
import './Dashboard.css';

const DashboardScheduleList = ({ schedule, isFetching }) => {
  const itemEls = schedule.map((item, i) => {
    return <ScheduleItem key={ i } item={ item } />
  });

  return isFetching ? (
    <div className="dashboard-schedule-empty-container">
      <div className="dashboard-schedule-empty">
        <div className="dashboard-schedule-spinner">
          <BarLoader
            color={'#5BCDB3'}
            width={280}
            height={2}
          />
        </div>
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
