import React from 'react';
import ChatListItem from './ChatListItem';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './ChatList.css';

const ChatList = ({ user, channels, fetchingSb }) => {
  const chatEls = channels.map((channel, i) => {
    return <ChatListItem
      key={ i }
      channel={ channel }
      user={ user }
    />
  });

  return fetchingSb ? (
    <div className="chatlist-empty-container">
      <div className="chatlist-empty-message chatlist-spinner">
        <FontAwesome className="fa-4x fa-spin" name="spinner" />
      </div>
    </div>
  ) : channels.length ? (
    <div className="chatlist-container">
      <div className="chatlist">
        <h1 className="chatlist-title">
          Messages
        </h1>
        <div className="chatlist-divider"></div>
        { chatEls }
      </div>
    </div>
  ) : (
    <div className="chatlist-empty-container">
      <div className="chatlist-empty-message">
        No messages to show
      </div>
      <div className="chatlist-empty-links">
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
  fetchingSb: state.fetchingSb,
});

export default connect(
  mapStateToProps
)(ChatList);
