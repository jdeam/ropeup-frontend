import React from 'react';
import DashboardImage from './DashboardImage';
import DashboardTabs from './DashboardTabs';
import { connect } from 'react-redux';
import './Dashboard.css';

const Dashboard = ({ token, user, tab, history }) => {
  if (!token) history.push('/');

  return (user) ? (
    <div className="dashboard-container">
      <div className="dashboard">
        <DashboardImage user={ user } />
        <DashboardTabs
          edit={ tab === 'edit' }
          schedule={ tab === 'schedule' }
          settings={ tab === 'settings' }
        />
      </div>
    </div>
  ) : (
    <div></div>
  );
};

const mapStateToProps = (state) => ({
  token: state.token,
  user: state.user,
  tab: state.dashboardTabInView
});

export default connect(
  mapStateToProps
)(Dashboard);
