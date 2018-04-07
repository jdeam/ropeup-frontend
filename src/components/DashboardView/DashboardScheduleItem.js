import React from 'react';
import scheduleMap from './scheduleItemMap';
import './Dashboard.css';

const DashboardScheduleItem = ({ item }) => {
  const day = scheduleMap.day[item.day];
  const start = scheduleMap.start[item.start];
  const end = scheduleMap.end[item.end];
  const times = start.slice(-2) === end.slice(-2) ?
    `${start.slice(0, -2)}-${end}` : `${start}-${end}`;

  return (
    <span className="tag is-info">
      { `${day}, ${times}` } &nbsp;
      <button className="delete is-small" />
    </span>
  );
};

export default DashboardScheduleItem;
