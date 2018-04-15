import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { sbSendMessage } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './MessageDetail.css';

class MessageDetailInput extends Component {
  state ={
    content: ''
  };

  sendMessage = (e) => {
    e.preventDefault();
    const { content } = this.state;
    const { channel, otherUserId, sbSendMessage } = this.props;
    sbSendMessage(channel, otherUserId, content);
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
            className="input is-rounded"
            type="text"
            placeholder="Aa"
            value={ this.state.content }
            onChange={ (e) => this.setState({ content: e.target.value }) }
          />
        </div>
        <a
          className="button is-rounded is-info"
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

const mapDispatchToProps = (dispatch) => bindActionCreators({
  sbSendMessage
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(MessageDetailInput);
