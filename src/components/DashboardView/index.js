import React, { Component } from 'react';
import DashboardImage from './DashboardImage';
import DashboardTabs from './DashboardTabs';
import { fetchUser } from '../../actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Dashboard.css';

class Dashboard extends Component {
  state = {
    edit: false,
    schedule: true,
    settings: false
  };

  componentDidMount() {
    if (!this.props.user) {
      const token = JSON.parse(localStorage.getItem('token'));
      if (!token) return this.props.history.push('/')
      this.props.fetchUser(token);
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
  user: state.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchUser
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard));
