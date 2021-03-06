import React, { Component } from 'react';
import MessageDetailListItem from './MessageDetailListItem';
import MessageDetailSchedule from './MessageDetailSchedule';
import { sbMarkAsRead } from '../../actions/sendbird';
import { BeatLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './MessageDetail.css';

class MessageDetailList extends Component {
  componentDidMount() {
    this.messagesEnd.scrollIntoView({ behavior: "instant" });
  }

  componentDidUpdate() {
    const { channelInView, sbMarkAsRead } = this.props;
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    sbMarkAsRead(channelInView);
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
    return (
      <div className="messagedetail-messagelist">
        <MessageDetailSchedule
          userSchedule={ userSchedule }
          otherUserSchedule={ otherUser.schedule }
        />
        <div className="messagedetail-divider"></div>
        { this.createMessageEls() }
        { typingStatuses[otherUser.username] ? (
          <div className="messagedetail-is-other">
            <div className="messagedetail-message messagedetail-other-message">
              <BeatLoader
                color={'#4A4A4A'}
                margin={'2px'}
                size={4}
              />
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
  typingStatuses: state.sbTypingStatusByUsername,
  channels: state.sbChannels,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  sbMarkAsRead,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageDetailList);
