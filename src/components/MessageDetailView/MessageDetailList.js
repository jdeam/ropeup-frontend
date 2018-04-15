import React, { Component } from 'react';
import MessageDetailListItem from './MessageDetailListItem';
import MessageDetailSchedule from './MessageDetailSchedule';
import { sbClearMessages } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './MessageDetail.css';

class MessageDetailList extends Component {
  componentDidMount() {
    this.messagesEnd.scrollIntoView({ behavior: "instant" });
  }

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behavior: "instant" });
  }

  componentWillUnmount() {
    this.props.sbClearMessages();
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
    return match ? (
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
    ) : (
      <div></div>
    )
  }
}

const mapStateToProps = (state) => ({
  schedule: state.schedule,
  sbUser: state.sbUser,
  messages: state.sbMessagesInView,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  sbClearMessages
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageDetailList);
