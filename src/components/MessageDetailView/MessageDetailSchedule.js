import React from 'react';
import MessageDetailScheduleItem from './MessageDetailScheduleItem';
import { overlapSchedules } from '../../util/schedules';
import './MessageDetail.css';

const MessageDetailSchedule = ({ userSchedule, otherUserSchedule }) => {
  const scheduleItems = overlapSchedules(userSchedule, otherUserSchedule);
  const scheduleItemEls = scheduleItems.map((item, i) => {
    return <MessageDetailScheduleItem key={ i } item={ item } />
  });

  return (
    <div>
      <div className="messagedetail-schedule">
        <div className="messagedetail-schedule-header">
          Matches your schedule on ...
        </div>
        <div className="tags">
          { scheduleItemEls }
        </div>
      </div>
    </div>
  );
};

export default MessageDetailSchedule;
