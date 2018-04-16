import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { sbSendMessage } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './MessageDetail.css';

class MessageDetailInput extends Component {
  state = { content: '' };

  sendMessage = async (e) => {
    e.preventDefault();
    const { content } = this.state;
    if (!content) return;
    const { channel, otherUserId, sbSendMessage } = this.props;
    await sbSendMessage(channel, otherUserId, content);
    channel.markAsRead();
    this.setState({ content: '' });
  }

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
            onChange={ (e) => this.setState({ content: e.target.value }) }
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
