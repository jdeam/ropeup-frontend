import React from 'react';
import FontAwesome from 'react-fontawesome';
import { withRouter, Link } from 'react-router-dom';
import './MessageDetail.css';

const MessageDetailHeader = ({ matchingUser, schedule, history }) => {

  console.log(matchingUser, schedule);
  const name = matchingUser.first_name;


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
          to={ `/matches/${matchingUser.id}`}
          className="messagedetail-header-top-right"
        >
          <div className="messagedetail-header-name">
            { name }
          </div>
          <div className="messagedetail-header-profile-link">
            View profile
          </div>
        </Link>
      </div>
      <div className="messagedetail-divider"></div>
      <div className="messagedetail-schedule">

      </div>
    </div>
  );
}

export default withRouter(MessageDetailHeader);
