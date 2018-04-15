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
    const { userSchedule, otherUser } = this.props;
    return (
      <div className="messagedetail-messagelist">
        <MessageDetailSchedule
          userSchedule={ userSchedule }
          otherUserSchedule={ otherUser.schedule }
        />
        <div className="messagedetail-divider"></div>
        { this.createMessageEls() }
        <div ref={ (el) => { this.messagesEnd = el; } }>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userSchedule: state.schedule,
  sbUser: state.sbUser,
});

export default connect(
  mapStateToProps
)(MessageDetailList);
