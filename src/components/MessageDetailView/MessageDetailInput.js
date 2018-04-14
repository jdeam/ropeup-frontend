import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import './MessageDetail.css';

class MessageDetailInput extends Component {
  state ={

  };

  render() {
    return (
      <form className="messagedetail-footer">
        <div className="messagedetail-input">
          <input
            className="input is-rounded"
            type="text"
            placeholder="Aa"
          />
        </div>
        <a className="button is-rounded is-info">
          <span className="icon">
            <FontAwesome name="chevron-up" />
          </span>
        </a>
      </form>
    );
  }
}

export default MessageDetailInput;
