import React, { Component } from 'react';
import ScheduleList from './DashboardScheduleList';
import './Dashboard.css';

class DashboardSchedule extends Component {

  state = {
    day: 0,
    start: 0,
    end: 0,
    is_adding: false,
    schedule: []
  }

  addToSchedule = () => {
    const { is_adding, schedule, ...newItem } = this.state;
    this.setState({
      schedule: [ ...this.state.schedule, newItem ]
    });
  };

  render() {
    return this.props.isActive ? (
      <div className="dashboard-form">
        <ScheduleList schedule={ this.state.schedule } />
        <div className="dashboard-divider"></div>
        <div className="dashboard-form-item">
          <div className="form-label">
            I want to climb
          </div>
          <div className="day-select">
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
          <div className="form-label">
            ... from
          </div>
          <div className="time-select">
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
          <div className="form-label-mid">
            to
          </div>
          <div className="time-select">
            <div className="select">
              <select
                value={ this.state.end }
                onChange={ (e) => this.setState({ end: parseInt(e.target.value, 10) }) }
              >
                <option value={0}>7am</option>
                <option value={1}>8am</option>
                <option value={2}>9am</option>
                <option value={3}>10am</option>
                <option value={4}>11am</option>
                <option value={5}>12pm</option>
                <option value={6}>1pm</option>
                <option value={7}>2pm</option>
                <option value={8}>3pm</option>
                <option value={9}>4pm</option>
                <option value={10}>5pm</option>
                <option value={11}>6pm</option>
                <option value={12}>7pm</option>
                <option value={13}>8pm</option>
                <option value={14}>9pm</option>
                <option value={15}>10pm</option>
                <option value={16}>11pm</option>
                <option value={17}>12am</option>
              </select>
            </div>
          </div>
        </div>
        <div
          className="button is-info add-to-schedule-button"
          onClick={ this.addToSchedule }
        >
          Add to schedule
        </div>
      </div>
    ) : (
      <div></div>
    );
  }
}

export default DashboardSchedule;
