import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './MessageList.css';

const MessageListItem = ({ channel, user }) => {
  const otherUser = channel.members.find(member => {
    return member.userId !== user.id.toString();
  });
  const time = moment(channel.lastMessage.createdAt).format('h:mm a');
  let { message } = channel.lastMessage;
  if (message.length > 30) message = `${message.slice(0, 30)} ...`;

  return (
    <Link to={ `/messages/${otherUser.userId}`}>
      <div className="messagelist-chat-container">
        <div className="messagelist-chat">
          <div className="image is-48x48">
            <img
              src={ otherUser.profileUrl }
              className="messagelist-img"
              alt=""
            />
          </div>
          <div className="messagelist-chat-content">
            <div className="messagelist-chat-content-top">
              <div className="messagelist-chat-name">
                { otherUser.nickname }
              </div>
              <div className="messagelist-chat-time">
                { time }
              </div>
            </div>
            <div className="messagelist-chat-content-message">
              { message }
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MessageListItem;

/*
Laurianne58@gmail.com
Fausto_Schmidt75@hotmail.com
Emerald45@yahoo.com
Kolby_Conn99@yahoo.com
Wava71@yahoo.com
Van.Bednar98@yahoo.com
Filiberto52@yahoo.com
Santiago60@hotmail.com
*/
