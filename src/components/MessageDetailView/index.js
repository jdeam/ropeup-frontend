import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './MessageDetail.css';

const MessageDetail = ({ match, isFetching, channels }) => {
  const { id } = match.params;
  const channelInView = channels[id];

  return isFetching ? (
    <div className="messagedetail-empty-container">
      <div className="messagedetail-empty-message">
        <FontAwesome className="fa-4x fa-spin" name="spinner" />
      </div>
    </div>
  ) : channelInView ? (
    <div>
      Got a channel!
    </div>
  ) : (
    <Redirect to="/messages" />
  )
};

const mapStateToProps = (state) => ({
  channels: state.sbChannelsByUserId,
  isFetching: state.isFetchingSb,
});

export default connect(
  mapStateToProps
)(MessageDetail);
