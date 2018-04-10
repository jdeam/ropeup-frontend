import React, { Component } from 'react';
import DashboardImage from './DashboardImage';
import DashboardTabs from './DashboardTabs';
import { connect } from 'react-redux';
import './Dashboard.css';

class Dashboard extends Component {
  state = {
    edit: true,
    schedule: false,
    settings: false,
  };

  componentDidMount() {
    const { token, history } = this.props;
    if (!token) return history.push('/');
    window.scrollTo(0, 0);
  }

  activateEdit = () => {
    this.setState({
      edit: true,
      schedule: false,
      settings: false
    });
  };

  activateSchedule = () => {
    this.setState({
      edit: false,
      schedule: true,
      settings: false
    });
  };

  activateSettings = () => {
    this.setState({
      edit: false,
      schedule: false,
      settings: true
    });
  };

  render() {
    const { edit, schedule, settings } = this.state;
    return (this.props.user) ? (
      <div className="dashboard-container">
        <div className="dashboard">
          <DashboardImage user={ this.props.user } />
          <DashboardTabs
            edit={ edit }
            schedule={ schedule }
            settings={ settings }
            activateEdit={ this.activateEdit }
            activateSchedule={ this.activateSchedule }
            activateSettings={ this.activateSettings }
          />
        </div>
      </div>
    ) : (
      <div></div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  user: state.user,
});

export default connect(
  mapStateToProps
)(Dashboard);
