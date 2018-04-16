import React from 'react';
import MessageDetailHeader from './MessageDetailHeader';
import MessageDetailList from './MessageDetailList';
import MessageDetailInput from './MessageDetailInput';
import { ClipLoader } from 'react-spinners';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './MessageDetail.css';

const MessageDetail = ({
  channelsByOtherUserId,
  messagesByOtherUserId,
  matchesById,
  isFetching,
  match,
  history,
}) => {
  window.scrollTo(0, 0);

  const { id } = match.params;
  const channelInView = channelsByOtherUserId[id];

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
          otherUser={ matchesById[id] }
          history={ history }
        />
        <MessageDetailList
          messages={ messagesByOtherUserId[id] }
          otherUser={ matchesById[id] }
        />
      </div>
      <MessageDetailInput
        otherUserId={ id }
        channel={ channelInView }
      />
    </div>
  ) : (
    <Redirect to="/messages" />
  )
};

const mapStateToProps = (state) => ({
  channelsByOtherUserId: state.sbChannelsByOtherUserId,
  messagesByOtherUserId: state.sbMessagesByOtherUserId,
  matchesById: state.matchesById,
  isFetching: state.sbIsFetching,
});

export default connect(
  mapStateToProps,
)(MessageDetail);
