import React from 'react';
import MessageListItem from './MessageListItem';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './MessageList.css';

const MessageList = ({ user, channels, isFetching }) => {
  window.scrollTo(0, 0);

  const activeChannels = channels.filter(channel => {
    return channel.lastMessage;
  });

  console.log(activeChannels);

  const messageEls = activeChannels.map((channel, i) => {
    return <MessageListItem
      key={ i }
      channel={ channel }
      user={ user }
    />
  });

  return isFetching ? (
    <div className="messagelist-empty-container">
      <div className="messagelist-empty-message messagelist-spinner">
        <FontAwesome className="fa-4x fa-spin" name="spinner" />
      </div>
    </div>
  ) : channels.length ? (
    <div className="messagelist-container">
      <div className="messagelist">
        <h1 className="messagelist-title">
          Messages
        </h1>
        <div className="messagelist-divider"></div>
        { messageEls }
      </div>
    </div>
  ) : (
    <div className="messagelist-empty-container">
      <div className="messagelist-empty-message">
        No messages to show
      </div>
      <div className="messagelist-empty-links">
        View your&nbsp;
        <Link
          to="/matches"
        >
          matches
        </Link>&nbsp;
        to meet climbers in your area who share your schedule.
      </div>
    </div>
  )
};

const mapStateToProps = (state) => ({
  user: state.user,
  channels: state.sbChannels,
  isFetching: state.isFetchingSb,
});

export default connect(
  mapStateToProps
)(MessageList);
