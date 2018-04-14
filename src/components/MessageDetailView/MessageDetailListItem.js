import React from 'react';
import moment from 'moment';
import './MessageDetail.css';

const MessageDetailListItem = ({ message, sbUser }) => {
  const isUser = sbUser.nickname === message.nickname;
  const time = moment(message.time).format('h:mm A');

  return (
    <div className={ isUser ?
      'messagedetail-is-user' :
      'messagedetail-is-other' }
    >
      <div className={ `messagedetail-timestamp${
        isUser ? ' messagedetail-time-right' :
        ' messagedetail-time-left'
      }` }>
        { time }
      </div>
      <div className={ `messagedetail-message${
        isUser ? ' messagedetail-user-message' :
        ' messagedetail-other-message'
      }` }
      >
        { message.text }
      </div>
    </div>
  );
};

export default MessageDetailListItem;
