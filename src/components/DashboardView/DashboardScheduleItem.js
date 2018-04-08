import React from 'react';
import scheduleMap from './scheduleMap';
import { fetchSchedule } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import BaseURL from '../../BaseURL';
import './Dashboard.css';

const DashboardScheduleItem = ({ user, item }) => {
  const day = scheduleMap.day[item.day];
  const start = scheduleMap.start[item.start];
  const end = scheduleMap.end[item.end];
  const times = start.slice(-2) === end.slice(-2) ?
    `${start.slice(0, -2)}-${end}` : `${start}-${end}`;

  const deleteScheduleItem = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.delete(
      `${BaseURL}/users/${user.id}/schedule/${item.id}`,
      { headers: { token } }
    );
    if (response.status === 200) fetchSchedule(token, user.id);
  }

  return (
    <span className="tag is-info">
      { `${day}, ${times}` } &nbsp;
      <button
        className="delete is-small"
        onClick={ deleteScheduleItem }
      />
    </span>
  );
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchSchedule
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(DashboardScheduleItem);
