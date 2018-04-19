import React from 'react';
import MessageListItem from './MessageListItem';
import { ClipLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './MessageList.css';

const MessageList = ({ sbUser, channels, isFetching }) => {
  window.scrollTo(0, 0);

  const activeChannels = channels.filter(channel => {
      return channel.lastMessage;
    })
   .sort((channelA, channelB) => {
     const aLastUpdatedAt = channelA.lastMessage.createdAt;
     const bLastUpdatedAt = channelB.lastMessage.createdAt;
     return bLastUpdatedAt - aLastUpdatedAt;
   });

  const channelEls = activeChannels.map((channel, i) => {
    return <MessageListItem
      key={ i }
      channel={ channel }
      sbUser={ sbUser }
    />;
  });

  return isFetching ? (
    <div className="messagelist-empty-container">
      <div className="messagelist-empty-message messagelist-spinner">
        <ClipLoader
          color={'#5BCDB3'}
          size={100}
        />
      </div>
    </div>
  ) : activeChannels.length ? (
    <div className="messagelist-container">
      <div className="messagelist">
        <h1 className="messagelist-title">
          Messages
        </h1>
        <div className="messagelist-divider"></div>
        { channelEls }
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
        to meet more climbers like you in your area.
      </div>
    </div>
  )
};

const mapStateToProps = (state) => ({
  sbUser: state.sbUser,
  channels: state.sbChannels,
  isFetching: state.sbIsFetching,
});

export default connect(
  mapStateToProps
)(MessageList);
