import React from 'react';
import moment from 'moment';
import './MessageDetail.css';

const MessageDetailListItem = ({ message, sbUser }) => {
  console.log(message);
  const isUser = message.sender.userId === sbUser.userId;
  const time = moment(message.createdAt).format('h:mm A');

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
        { message.message }
      </div>
    </div>
  );
};

export default MessageDetailListItem;
