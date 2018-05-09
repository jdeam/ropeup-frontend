import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { sbSendMessage } from '../../actions/sendbird';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './MessageDetail.css';

class MessageDetailInput extends Component {
  state = {
    content: '',
    isTyping: false,
  };

  sendMessage = async (e) => {
    e.preventDefault();
    const { content } = this.state;
    if (!content) return;
    const { channel, otherUsername, sbSendMessage } = this.props;
    await sbSendMessage(channel, otherUsername, content);
    this.setState({ content: '' });
    this.updateTypingStatus();
  };

  updateTypingStatus = () => {
    const { content, isTyping } = this.state;
    const { channel } = this.props;
    if (content && !isTyping) {
      this.setState({ isTyping: true });
      channel.startTyping();
    }
    if (!content && isTyping) {
      this.setState({ isTyping: false });
      channel.endTyping();
    }
  };

  render() {
    return (
      <form
        className="messagedetail-footer"
        onSubmit={ this.sendMessage }
      >
        <div className="messagedetail-input">
          <input
            className="input is-primary is-rounded"
            type="text"
            placeholder="Aa"
            value={ this.state.content }
            onChange={ (e) => {
              this.setState({ content: e.target.value });
              this.updateTypingStatus();
            } }
          />
        </div>
        <a
          className={ `button is-rounded ${
            this.state.content ? " is-primary" : "" } ${
            this.props.isSending ? " is-loading" : ""
          }` }
          disabled={ !this.state.content }
          onClick={ this.sendMessage }
        >
          <span className="icon">
            <FontAwesome
              className="messagedetail-send-button"
              name="chevron-up"
            />
          </span>
        </a>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  isSending: state.sbIsSending,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  sbSendMessage
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageDetailInput);
