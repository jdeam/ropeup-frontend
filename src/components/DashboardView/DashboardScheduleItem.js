import React from 'react';
import { scheduleMap } from '../../util/schedules';
import { fetchSchedule, fetchMatches } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
const BaseURL = process.env.REACT_APP_BASE_URL;

const DashboardScheduleItem = ({
  token,
  user,
  item,
  fetchSchedule,
  fetchMatches,
}) => {
  const day = scheduleMap.day[item.day];
  const start = scheduleMap.time[item.start];
  const end = scheduleMap.time[item.end];
  const times = start.slice(-2) === end.slice(-2) ?
    `${start.slice(0, -2)}-${end}` : `${start}-${end}`;

  const deleteScheduleItem = async () => {
    const response = await axios.delete(
      `${BaseURL}/users/${user.id}/schedule/${item.id}`,
      { headers: { token } }
    );
    if (response.status === 200) {
      await fetchSchedule();
      fetchMatches();
    }
  }

  return (
    <span className="tag is-medium is-info">
      { `${day}, ${times}` } &nbsp;
      <button
        className="delete is-small"
        onClick={ deleteScheduleItem }
      />
    </span>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  token: state.token,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchSchedule,
  fetchMatches,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardScheduleItem);
