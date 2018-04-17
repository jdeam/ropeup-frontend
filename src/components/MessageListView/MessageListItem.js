import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { sbMarkAsRead } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createLastMessageTimestamp } from '../../util/timestamps';
import './MessageList.css';

const MessageListItem = ({
  channel,
  sbUser,
  typingStatuses,
  sbMarkAsRead
}) => {
  const otherUser = channel.members.find(member => {
    return member.userId !== sbUser.userId;
  });
  const isTyping = typingStatuses[otherUser.userId];
  const time = createLastMessageTimestamp(channel.lastMessage.createdAt);
  const isUnread = channel.unreadMessageCount;

  let { message } = channel.lastMessage;
  if (isUnread && message.length > 27) message = `${message.slice(0, 27)}...`;
  else if (message.length > 29) message = `${message.slice(0, 29)}...`;

  return (
    <Fragment>
      <Link
        to={ `/messages/${otherUser.userId}` }
        onClick={ () => sbMarkAsRead(channel) }
      >
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
                <div className={ isUnread ? "name-unread" : "name-read" }>
                  { otherUser.nickname }
                </div>
                <div className={ isUnread ? "time-unread" : "time-read" }>
                  { time }
                </div>
              </div>
              <div className={ `messagelist-chat-content-message ${
                isUnread ? "message-unread" : "message-read"
              }` }>
                { isTyping ? (
                  <BeatLoader
                    color={'#4A4A4A'}
                    margin={'2px'}
                    size={4}
                  />
                ) : (
                  message
                ) }
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="messagelist-divider-short"></div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  typingStatuses: state.sbTypingStatusByOtherUserId,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  sbMarkAsRead,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageListItem);
