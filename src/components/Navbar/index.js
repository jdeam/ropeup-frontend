import React from 'react';
import Headroom from 'react-headroom';
import FontAwesome from 'react-fontawesome';
import { Link, withRouter } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ location }) => {
  const { pathname } = location;

  return (pathname !== "/" && pathname !== "/signup") ? (
    <Headroom>
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
            className={ pathname === "/chat" ? "is-active" : "" }
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
