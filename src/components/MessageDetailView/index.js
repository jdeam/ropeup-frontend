import React from 'react';
import MessageDetailHeader from './MessageDetailHeader';
import MessageDetailList from './MessageDetailList';
import MessageDetailInput from './MessageDetailInput';
import { ClipLoader } from 'react-spinners';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './MessageDetail.css';

const MessageDetail = ({
  channelsByUsername,
  messagesByUsername,
  matchesByUsername,
  isFetching,
  match,
  history,
}) => {
  window.scrollTo(0, 0);

  const { username } = match.params;
  const channelInView = channelsByUsername[username];

  return isFetching ? (
    <div className="messagedetail-empty-container">
      <div className="messagedetail-empty-message">
        <ClipLoader
          color={'#5BCDB3'}
          size={100}
        />
      </div>
    </div>
  ) : channelInView ? (
    <div className="messagedetail-container">
      <div className="messagedetail">
        <MessageDetailHeader
          otherUser={ matchesByUsername[username] }
          history={ history }
        />
        <MessageDetailList
          messages={ messagesByUsername[username] }
          otherUser={ matchesByUsername[username] }
          channelInView={ channelInView }
        />
      </div>
      <MessageDetailInput
        otherUsername={ username }
        channel={ channelInView }
      />
    </div>
  ) : (
    <Redirect to="/messages" />
  )
};

const mapStateToProps = (state) => ({
  channelsByUsername: state.sbChannelsByUsername,
  messagesByUsername: state.sbMessagesByUsername,
  matchesByUsername: state.matchesByUsername,
  isFetching: state.sbIsFetching,
});

export default connect(
  mapStateToProps,
)(MessageDetail);
