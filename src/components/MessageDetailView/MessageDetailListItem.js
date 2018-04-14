import React from 'react';
import moment from 'moment';
import './MessageDetail.css';

const MessageDetailListItem = ({ message, sbUser }) => {
  const isUser = sbUser.nickname === message.nickname;

  return (
    <div className={ isUser ?
      'messagedetail-is-user' :
      'messagedetail-is-other' }
    >
      <div className="">

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
