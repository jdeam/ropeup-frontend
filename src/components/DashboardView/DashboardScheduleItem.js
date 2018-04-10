import React from 'react';
import { scheduleMap } from '../../util/schedules';
import { fetchSchedule } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
const BaseURL = process.env.REACT_APP_BASE_URL;

const DashboardScheduleItem = ({ user, item, fetchSchedule }) => {
  const day = scheduleMap.day[item.day];
  const start = scheduleMap.time[item.start];
  const end = scheduleMap.time[item.end];
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
