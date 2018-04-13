import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './ChatList.css';

const ChatListItem = ({ channel, user }) => {
  const otherUser = channel.members[1];
  const time = moment(Date.now()).format('h:mm a');
  const message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec lacus facilisis, accumsan metus quis, interdum justo.';

  return (
    <Link to={ `/chat/${otherUser.userId}`}>
      <div className="chatlist-chat-container">
        <div className="chatlist-chat">
          <div className="image is-48x48">
            <img
              src={ otherUser.profileUrl }
              className="matchlist-img"
              alt=""
            />
          </div>
          <div className="chatlist-chat-content">
            <div className="chatlist-chat-content-top">
              <div className="chatlist-chat-content-name">
                { otherUser.nickname }
              </div>
              <div className="chatlist-chat-content-time">
                { time }
              </div>
            </div>
            <div className="chatlist-chat-content-message">
              { `${message.slice(0, 26)} ...` }
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChatListItem;

// Laurianne58@gmail.com
// Fausto_Schmidt75@hotmail.com
// Emerald45@yahoo.com
// Kolby_Conn99@yahoo.com
// Wava71@yahoo.com
// Van.Bednar98@yahoo.com
// Filiberto52@yahoo.com
// Santiago60@hotmail.com
