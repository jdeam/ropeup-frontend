import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import './MessageDetail.css';

const MessageDetailHeader = ({ match, history }) => {
  return (
    <div className="messagedetail-header">
      <div className="messagedetail-header-top">
        <a
          className="messagedetail-header-back-nav"
          onClick={ () => history.goBack() }
        >
          <FontAwesome
            className="fa-2x"
            name="angle-left"
          />
          &nbsp;Back
        </a>
        <Link
          to={ `/matches/${match ? match.id : ''}`}
          className="messagedetail-header-top-right"
        >
          <div className="messagedetail-header-name">
            { match ? match.first_name : '' }
          </div>
          <div className="messagedetail-header-profile-link">
            View profile
          </div>
        </Link>
      </div>
      <div className="messagedetail-divider"></div>
    </div>
  );
};

export default MessageDetailHeader;
