import React, { Component } from 'react';
import MessageDetailListItem from './MessageDetailListItem';
import MessageDetailSchedule from './MessageDetailSchedule';
import { connect } from 'react-redux';
import './MessageDetail.css';

class MessageDetailList extends Component {
  componentDidMount() {
    this.messagesEnd.scrollIntoView({ behavior: "instant" });
  }

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  createMessageEls = () => {
    const { sbUser, messages } = this.props;
    return messages.map((message, i) => {
      return <MessageDetailListItem
        key={ i }
        sbUser={ sbUser }
        message={ message }
      />;
    });
  };

  render() {
    const { userSchedule, otherUser, typingStatuses } = this.props;
    // console.log(typingStatuses[otherUser.id]);
    return (
      <div className="messagedetail-messagelist">
        <MessageDetailSchedule
          userSchedule={ userSchedule }
          otherUserSchedule={ otherUser.schedule }
        />
        <div className="messagedetail-divider"></div>
        { this.createMessageEls() }
        { typingStatuses[otherUser.id] ? (
          <div className="messagedetail-is-other">
            <div className="messagedetail-message messagedetail-other-message">
              ...
            </div>
          </div>
        ) : (
          <div className="messagedetail-blank"></div>
        ) }
        <div ref={ (el) => { this.messagesEnd = el; } }>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userSchedule: state.schedule,
  sbUser: state.sbUser,
  typingStatuses: state.sbTypingStatusByOtherUserId,
});

export default connect(
  mapStateToProps
)(MessageDetailList);
