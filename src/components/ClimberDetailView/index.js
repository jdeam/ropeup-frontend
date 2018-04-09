import React, { Component } from 'react';
import { fetchUser, fetchSchedule, fetchClimbers } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './ClimberDetail.css';

class ClimberDetail extends Component {
  state = {
    isLoading: false
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchUserInfo();
  }

  fetchUserInfo = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const { history, fetchUser, fetchSchedule, fetchClimbers } = this.props;
    if (!token) return history.push('/')
    if (!this.props.user) {
      this.setState({ isLoading: true });
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
        .then(() => {
          this.setState({ isLoading: false });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    const { climbers, match } = this.props;
    const { id } = match.params;
    const climber = climbers[id];
    return climber ? (
      <div>
      </div>
    ) : (
      <div></div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  schedule: state.schedule,
  climbers: state.climbersById
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchUser,
  fetchSchedule,
  fetchClimbers
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClimberDetail);
