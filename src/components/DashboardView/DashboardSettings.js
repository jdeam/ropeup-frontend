import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Dashboard.css';

const DashboardSettings = ({ isActive, user, logout }) => {

  return isActive ? (
    <div className="dashboard-form-container">
      <div className="dashboard-form">
        <Link
          to="/"
          className="button logout-button"
          onClick={ () => {
            logout();
            localStorage.removeItem('token');
          } }
        >
          Logout
        </Link>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  logout
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(DashboardSettings);