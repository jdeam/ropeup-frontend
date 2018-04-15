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
    return this.props.messages.map((message, i) => {
      return <MessageDetailListItem
        key={ i }
        sbUser={ this.props.sbUser }
        message={ message }
      />;
    });
  };

  render() {
    const { schedule, match } = this.props;
    return (
      <div className="messagedetail-messagelist">
        <MessageDetailSchedule
          userSchedule={ schedule }
          matchSchedule={ match.schedule }
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
  schedule: state.schedule,
  sbUser: state.sbUser,
  messages: state.sbMessagesInView,
});

export default connect(
  mapStateToProps
)(MessageDetailList);
