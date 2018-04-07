import React, { Component } from 'react';
import DashboardTabs from './DashboardTabs';
import { fetchUser } from '../../actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import './Dashboard.css';

class Dashboard extends Component {
  state = {
    edit: true,
    schedule: false,
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

  getAge = () => {
    return moment().diff(this.props.user.dob, 'years', false);
  }

  render() {
    return (this.props.user) ? (
      <div className="dashboard-container">
        <div className="dashboard">
          <div className="dashboard-img-container">
            <div className="image is-128x128">
              <img
                src={ this.props.user.img_url }
                className="dashboard-img"
                alt=""
              />
            </div>
            <div className="title is-4 dashboard-name">
              { `${this.props.user.first_name}, ${this.getAge()}` }
            </div>
          </div>
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
