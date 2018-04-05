import React from 'react';
import Headroom from 'react-headroom';
import FontAwesome from 'react-fontawesome';
import { Link, withRouter } from 'react-router-dom';
import './Header.css';

const Header = ({ location }) => {
  const curLoc = location.pathname;

  return (curLoc !== "/login" && curLoc !== "/signup") ? (
    <Headroom>
      <div className="tabs is-centered is-fullwidth header-tabs">
        <ul>
          <li
            className={ curLoc === "/dashboard" ? "is-active" : "" }
          >
            <Link to="/dashboard"
              ><FontAwesome name="user-circle" />
            </Link>
          </li>
          <li
            className={ curLoc === "/climbers" ? "is-active" : "" }
          >
            <Link to="/climbers">
              <FontAwesome name="search" />
            </Link>
          </li>
          <li
            className={ curLoc === "/messages" ? "is-active" : "" }
          >
            <Link to="/messages">
              <FontAwesome name="comment" />
            </Link>
          </li>
        </ul>
      </div>
    </Headroom>
  ) : (
    <div></div>
  )
}

export default withRouter(Header);
