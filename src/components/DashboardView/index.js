import React from 'react';
import DashboardImage from './DashboardImage';
import DashboardTabs from './DashboardTabs';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import './Dashboard.css';

const Dashboard = ({ user, isFetching, tabInView }) => {
  window.scrollTo(0, 0);

  return isFetching ? (
    <div className="dashboard-empty-container">
      <div className="dashboard-empty-message">
        <FontAwesome className="fa-4x fa-spin" name="spinner" />
      </div>
    </div>
  ) : (
    <div className="dashboard-container">
      <div className="dashboard">
        <DashboardImage user={ user } />
        <DashboardTabs
          edit={ tabInView === 'edit' }
          schedule={ tabInView === 'schedule' }
          settings={ tabInView === 'settings' }
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  isFetching: state.isFetchingUser,
  tabInView: state.dashboardTabInView,
});

export default connect(
  mapStateToProps
)(Dashboard);
