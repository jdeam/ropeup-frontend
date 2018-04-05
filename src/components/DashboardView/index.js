import React, { Component } from 'react';
import users from './users';
import moment from 'moment';
import DashboardTabs from './DashboardTabs';
import DashboardEdit from './DashboardEdit';
import DashboardSchedule from './DashboardSchedule';
import './Dashboard.css';

const user = users[0]
const age = moment().diff(user.dob, 'years', false);

class Dashboard extends Component {
  state = {
    schedule: true,
    edit: false
  };

  activateSchedule = () => {
    this.setState({
      schedule: true,
      edit: false
    });
  }

  activateEdit = () => {
    this.setState({
      schedule: false,
      edit: true
    });
  }

  render() {
    return (
      <div className="dashboard-container">
        <div className="dashboard">
          <div className="dashboard-img-container">
            <div className="image is-128x128">
              <img
                src={ user.img_url }
                className="dashboard-img"
                alt=""
              />
            </div>
            <div className="title is-4 dashboard-name">
              { `${user.first_name}, ${age}` }
            </div>
          </div>
          <DashboardTabs
            schedule={ this.state.schedule }
            edit={ this.state.edit }
            activateSchedule={ this.activateSchedule }
            activateEdit={ this.activateEdit }
          />

          <DashboardEdit isActive={ this.state.edit } />
          <DashboardSchedule isActive={ this.state.schedule } />
        </div>
      </div>
    );
  }
}

export default Dashboard;
