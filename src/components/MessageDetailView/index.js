import React from 'react';
import MessageDetailHeader from './MessageDetailHeader';
import MessageDetailList from './MessageDetailList';
import MessageDetailInput from './MessageDetailInput';
import FontAwesome from 'react-fontawesome';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './MessageDetail.css';

const MessageDetail = ({
  channels,
  matches,
  isFetching,
  match,
  history,
}) => {
  const { id } = match.params;
  const channelInView = channels[id];

  return isFetching ? (
    <div className="messagedetail-empty-container">
      <div className="messagedetail-empty-message">
        <FontAwesome className="fa-4x fa-spin" name="spinner" />
      </div>
    </div>
  ) : channelInView ? (
    <div className="messagedetail-container">
      <div className="messagedetail">
        <MessageDetailHeader
          match={ matches[id] }
          history={ history }
        />
        <MessageDetailList match={ matches[id] }/>
      </div>
      <MessageDetailInput />
    </div>
  ) : (
    <Redirect to="/messages" />
  )
};

const mapStateToProps = (state) => ({
  channels: state.sbChannelsByUserId,
  matches: state.matchesById,
  isFetching: state.isFetchingSb,
});

export default connect(
  mapStateToProps
)(MessageDetail);
