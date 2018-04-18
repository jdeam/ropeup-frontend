import React, { Fragment } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './Navbar.css';

const Navbar = ({ numUnread, location }) => {
  const { pathname } = location;

  return (
    pathname !== "/login" &&
    pathname !== "/signup" &&
    pathname !== "/welcome"
  ) ? (
    <Fragment>
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
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={
          numUnread ?
          "navbar-unread-messages" :
          "navbar-no-unread-messages"
        }
      >
        { numUnread }
      </div>
    </Fragment>
  ) : (
    <div></div>
  );
};

const mapStateToProps = (state) => ({
  numUnread: state.sbNumUnread,
});

export default withRouter(connect(
  mapStateToProps
)(Navbar));
