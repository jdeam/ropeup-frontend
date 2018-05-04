import React from 'react';
import { Link } from 'react-router-dom';
import { clearAllUserInfo } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Dashboard.css';

const DashboardSettings = ({ isActive, user, clearAllUserInfo }) => {
  return isActive ? (
    <div className="dashboard-form-container">
      <div className="dashboard-form">
        <Link
          to="/"
          id="logout"
          className="button dashboard-logout-button"
          onClick={ clearAllUserInfo }
        >
          Logout
        </Link>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  clearAllUserInfo,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardSettings);
