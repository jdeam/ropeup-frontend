import React from 'react';
import ChatListItem from './ChatListItem';
import { connect } from 'react-redux';
import './ChatList.css';

const ChatList = ({ channels }) => {
  const chatEls = channels.map((channel, i) => {
    return <ChatListItem key={ i } channel={ channel } />
  });

  return (
    <div>
      { chatEls }
    </div>
  );
};

const mapStateToProps = (state) => ({
  channels: state.sbChannels,
});

export default connect(
  mapStateToProps
)(ChatList);
