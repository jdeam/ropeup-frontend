import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './Navbar.css';

const Navbar = ({ channels, sbUser, location }) => {
  const { pathname } = location;
  const activeChannels = channels.filter(channel => channel.lastMessage);
  const numUnreadMessages = activeChannels.reduce((numUnread, channel) => {
    const { cachedReadReceiptStatus } = channel;
    const readStatus = cachedReadReceiptStatus[sbUser.userId];
    return numUnread + (readStatus ? 0 : 1);
  }, 0);

  return (pathname !== "/login" && pathname !== "/signup") ? (
    <div className="navbar-top-container">
      <div className="tabs is-centered is-fullwidth header-tabs">
        <ul>
          <li
            className={ pathname === "/dashboard" ? "is-active" : "" }
          >
            <Link to="/dashboard"
              ><FontAwesome name="user-circle" />
            </Link>
          </li>
          <li
            className={ pathname.includes("/matches") ? "is-active" : "" }
          >
            <Link to="/matches">
              <FontAwesome name="search" />
            </Link>
          </li>
          <li
            className={ pathname.includes("/messages") ? "is-active" : "" }
          >
            <Link to="/messages">
              <FontAwesome name="comments" />
              {/* { numUnreadMessages } */}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

const mapStateToProps = (state) => ({
  channels: state.sbChannels,
  sbUser: state.sbUser,
});

export default withRouter(connect(
  mapStateToProps
)(Navbar));
