import React from 'react';
import Headroom from 'react-headroom';
import FontAwesome from 'react-fontawesome';
import { Link, withRouter } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ location }) => {
  const path = location.pathname;

  return (path !== "/" && path !== "/signup") ? (
    <Headroom>
      <div className="tabs is-centered is-fullwidth header-tabs">
        <ul>
          <li
            className={ path === "/dashboard" ? "is-active" : "" }
          >
            <Link to="/dashboard"
              ><FontAwesome name="user-circle" />
            </Link>
          </li>
          <li
            className={ path.includes("/climbers") ? "is-active" : "" }
          >
            <Link to="/climbers">
              <FontAwesome name="search" />
            </Link>
          </li>
          <li
            className={ path === "/chat" ? "is-active" : "" }
          >
            <Link to="/chat">
              <FontAwesome name="comments" />
            </Link>
          </li>
        </ul>
      </div>
    </Headroom>
  ) : (
    <div></div>
  );
};

export default withRouter(Navbar);
