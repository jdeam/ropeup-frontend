import React, { Component } from 'react';
import { createSingleMessageTimestamp } from '../../util/timestamps';
import './MessageDetail.css';

class MessageDetailListItem extends Component {
  state = {
    tsHidden: true,
  };

  toggleTimestamp = () => {
    const { tsHidden } = this.state;
    this.setState({ tsHidden: !tsHidden });
  }

  render() {
    const { message, sbUser } = this.props;
    const isUser = message.sender.userId === sbUser.userId;
    const time = createSingleMessageTimestamp(message.createdAt);

    return (
      <div className={ isUser ?
        'messagedetail-is-user' :
        'messagedetail-is-other' }
        >
          <div className={ `messagedetail-timestamp${
            this.state.tsHidden ? ' messagedetail-timestamp-hidden' :
            isUser ? ' messagedetail-time-right' :
            ' messagedetail-time-left'
          }` }>
          { time }
        </div>
        <div
          onClick={ this.toggleTimestamp }
          className=
            { `messagedetail-message${
              isUser ? ' messagedetail-user-message' :
              ' messagedetail-other-message'
            }` }
        >
          { message.message }
        </div>
      </div>
    );
  }
};

export default MessageDetailListItem;
