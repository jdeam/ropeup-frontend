import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSchedule } from '../../actions';
import ScheduleList from './DashboardScheduleList';
import axios from 'axios';
import './Dashboard.css';
const BaseURL = process.env.REACT_APP_BASE_URL;

class DashboardSchedule extends Component {
  state = {
    day: 0,
    start: 0,
    end: 1,
    isAdding: false,
  }

  addScheduleItem = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const { user, fetchSchedule } = this.props;
    const { isAdding, ...newItem } = this.state;
    const response = await axios.post(
      `${BaseURL}/users/${user.id}/schedule/`,
      newItem,
      { headers: { token } }
    );
    if (response.status === 200) fetchSchedule(token, user.id);
  }

  render() {
    return this.props.isActive ? (
      <div className="dashboard-form">
        <ScheduleList
          user={ this.props.user }
          schedule={ this.props.schedule }
        />
        <div className="dashboard-divider"></div>
        <div className="dashboard-form-item">
          <div className="dashboard-form-label">
            I want to climb
          </div>
          <div className="dashboard-day-select">
            <div className="select">
              <select
                value={ this.state.day }
                onChange={ (e) => this.setState({ day: parseInt(e.target.value, 10) }) }
              >
                <option value={0}>Mondays</option>
                <option value={1}>Tuesdays</option>
                <option value={2}>Wednesdays</option>
                <option value={3}>Thursdays</option>
                <option value={4}>Fridays</option>
                <option value={5}>Saturdays</option>
                <option value={6}>Sundays</option>
              </select>
            </div>
          </div>
        </div>
        <div className="dashboard-form-item">
          <div className="dashboard-form-label">
            ... from
          </div>
          <div className="dashboard-time-select">
            <div className="select">
              <select
                value={ this.state.start }
                onChange={ (e) => this.setState({ start: parseInt(e.target.value, 10) }) }
              >
                <option value={0}>6am</option>
                <option value={1}>7am</option>
                <option value={2}>8am</option>
                <option value={3}>9am</option>
                <option value={4}>10am</option>
                <option value={5}>11am</option>
                <option value={6}>12pm</option>
                <option value={7}>1pm</option>
                <option value={8}>2pm</option>
                <option value={9}>3pm</option>
                <option value={10}>4pm</option>
                <option value={11}>5pm</option>
                <option value={12}>6pm</option>
                <option value={13}>7pm</option>
                <option value={14}>8pm</option>
                <option value={15}>9pm</option>
                <option value={16}>10pm</option>
                <option value={17}>11pm</option>
              </select>
            </div>
          </div>
          <div className="dashboard-form-label-mid">
            to
          </div>
          <div className="dashboard-time-select">
            <div className="select">
              <select
                value={ this.state.end }
                onChange={ (e) => this.setState({ end: parseInt(e.target.value, 10) }) }
              >
                <option value={1}>7am</option>
                <option value={2}>8am</option>
                <option value={3}>9am</option>
                <option value={4}>10am</option>
                <option value={5}>11am</option>
                <option value={6}>12pm</option>
                <option value={7}>1pm</option>
                <option value={8}>2pm</option>
                <option value={9}>3pm</option>
                <option value={10}>4pm</option>
                <option value={11}>5pm</option>
                <option value={12}>6pm</option>
                <option value={13}>7pm</option>
                <option value={14}>8pm</option>
                <option value={15}>9pm</option>
                <option value={16}>10pm</option>
                <option value={17}>11pm</option>
                <option value={18}>12am</option>
              </select>
            </div>
          </div>
        </div>
        <div
          className="button is-info dashboard-add-button"
          onClick={ this.addScheduleItem }
        >
          Add to schedule
        </div>
      </div>
    ) : (
      <div></div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  schedule: state.schedule
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchSchedule
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardSchedule);
