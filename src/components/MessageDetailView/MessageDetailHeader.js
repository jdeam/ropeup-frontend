import React from 'react';
import FontAwesome from 'react-fontawesome';
import MessageDetailScheduleItem from './MessageDetailScheduleItem';
import { withRouter, Link } from 'react-router-dom';
import './MessageDetail.css';

const MessageDetailHeader = ({ matchingUser, userSched, history }) => {
  const name = matchingUser.first_name;
  const scheduleEls = matchingUser.schedule.filter(item => {
    for (let time=item.start; time<item.end; time++) {
      if (parseInt(userSched[item.day][time], 10)) return true;
    }
    return false;
  }).map((item, i) => {
    let { day, start, end } = item;
    while (!parseInt(userSched[day][start], 10)) start++;
    while (!parseInt(userSched[day][end-1], 10)) end--;
    return <MessageDetailScheduleItem
      key={ i }
      item={ { day, start, end } }
    />
  });

  return (
    <div className="messagedetail-header">
      <div className="messagedetail-header-top">
        <a
          className="messagedetail-header-back-nav"
          onClick={ () => history.goBack() }
        >
          <FontAwesome
            className="fa-2x"
            name="angle-left"
          />
          &nbsp;Back
        </a>
        <Link
          to={ `/matches/${matchingUser.id}`}
          className="messagedetail-header-top-right"
        >
          <div className="messagedetail-header-name">
            { name }
          </div>
          <div className="messagedetail-header-profile-link">
            View profile
          </div>
        </Link>
      </div>
      <div className="messagedetail-divider"></div>
      <div className="messagedetail-schedule">
        <div className="messagedetail-schedule-header">
          Matches your schedule on ...
        </div>
        <div className="tags">
          { scheduleEls }
        </div>
      </div>
      <div className="messagedetail-divider"></div>
    </div>
  );
};

export default withRouter(MessageDetailHeader);
