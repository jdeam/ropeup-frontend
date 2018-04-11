import React from 'react';
import DashboardImage from './DashboardImage';
import DashboardTabs from './DashboardTabs';
import { connect } from 'react-redux';
import './Dashboard.css';

const Dashboard = ({ user, tabInView }) => {
  return user ? (
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
  ) : (
    <div></div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  tabInView: state.dashboardTabInView
});

export default connect(
  mapStateToProps
)(Dashboard);
