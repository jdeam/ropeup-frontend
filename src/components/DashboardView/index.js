import React, { Component } from 'react';
import DashboardImage from './DashboardImage';
import DashboardTabs from './DashboardTabs';
import { fetchUser, fetchSchedule, fetchClimbers } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Dashboard.css';

class Dashboard extends Component {
  state = {
    edit: true,
    schedule: false,
    settings: false
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const token = JSON.parse(localStorage.getItem('token'));
    const { history, fetchUser, fetchSchedule, fetchClimbers } = this.props;
    if (!token) return history.push('/')
    if (!this.props.user) {
      return fetchUser(token)
        .then(user => {
          return fetchSchedule(token, user.id);
        })
        .then(schedule => {
          const { zip } = this.props.user;
          if (schedule.length && zip) {
            return fetchClimbers(token, zip, schedule);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  activateEdit = () => {
    this.setState({
      edit: true,
      schedule: false,
      settings: false
    });
  }

  activateSchedule = () => {
    this.setState({
      edit: false,
      schedule: true,
      settings: false
    });
  }

  activateSettings = () => {
    this.setState({
      edit: false,
      schedule: false,
      settings: true
    });
  }

  render() {
    return (this.props.user) ? (
      <div className="dashboard-container">
        <div className="dashboard">
          <DashboardImage user={ this.props.user } />
          <DashboardTabs
            edit={ this.state.edit }
            schedule={ this.state.schedule }
            settings={ this.state.settings }
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
  user: state.user,
  climbers: state.climbers,
  schedule: state.schedule
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchUser,
  fetchSchedule,
  fetchClimbers
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
