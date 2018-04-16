import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { sbMarkAsRead } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
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
  const time = moment(channel.lastMessage.createdAt).format('h:mm a');
  const readStatus = channel.unreadMessageCount;

  let { message } = channel.lastMessage;
  if (message.length > 27) message = `${message.slice(0, 27)} ...`;

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
              <div className={ `messagelist-chat-content-top ${
                readStatus ? "messagelist-is-unread" : "messagelist-is-read"
              }` }>
                <div>
                  { otherUser.nickname }
                </div>
                <div>
                  { time }
                </div>
              </div>
              <div className={ `messagelist-chat-content-message ${
                readStatus ? "messagelist-is-unread" : "messagelist-is-read"
              }` }>
                { typingStatuses[otherUser.userId] ? '...' : message }
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
