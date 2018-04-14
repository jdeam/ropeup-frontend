import React from 'react';
import MessageDetailListItem from './MessageDetailListItem';
import { connect } from 'react-redux';
import './MessageDetail.css';

import fakeMessages from './fake_messages';

const MessageDetailList = ({ sbUser }) => {

  const messageEls = fakeMessages.map((message, i) => {
    return <MessageDetailListItem
      key={ i }
      sbUser={ sbUser}
      message={ message }
    />
  });

  return (
    <div className="messagedetail-messagelist">
      { messageEls }
    </div>
  );
};

const mapStateToProps = (state) => ({
  sbUser: state.sbUser
});

export default connect(
  mapStateToProps
)(MessageDetailList);
