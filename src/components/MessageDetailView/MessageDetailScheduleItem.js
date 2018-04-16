import React from 'react';
import { scheduleMap } from '../../util/schedules';

const MessageDetailScheduleItem = ({ item }) => {
  const day = scheduleMap.day[item.day];
  const start = scheduleMap.time[item.start];
  const end = scheduleMap.time[item.end];
  const times = start.slice(-2) === end.slice(-2) ?
    `${start.slice(0, -2)}-${end}` : `${start}-${end}`;

  return (
    <span className="tag is-white messagedetail-tag">
      { `${day}, ${times}` }
    </span>
  );
};

export default MessageDetailScheduleItem;
