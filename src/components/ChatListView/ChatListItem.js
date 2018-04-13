import React from 'react';
import { Link } from 'react-router-dom';
import './ChatList.css';

const ChatListItem = ({ channel, user }) => {
  console.log(channel);
  const otherUser = channel.members[1];

  return (
    <Link to={ `/chat/${otherUser.userId}`}>
      <div className="chatlist-chat-container">
        <div className="chatlist-chat">
          <div className="image is-48x48">
            <img
              src={ otherUser ? otherUser.profileUrl : "" }
              className="matchlist-img"
              alt=""
            />
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
