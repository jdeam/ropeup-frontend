import React, { Component } from 'react';
import ClimberListItem from './ClimberListItem';
import { fetchUser, fetchSchedule, fetchClimbers } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './ClimberList.css';

class ClimberList extends Component {
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

  createClimberEls = () => {
    const { user, climbers } = this.props;
    return climbers.map((climber, i) => {
      return <ClimberListItem
        key={ i }
        zip={ user.zip }
        climber={ climber }
      />
    });
  };

  render() {
    return this.props.climbers.length ? (
      <div className="climberlist-container">
        <div className="climberlist">
          { this.createClimberEls() }
        </div>
      </div>
    ) : (
      <div></div>
    )
  }
};

const mapStateToProps = (state) => ({
  user: state.user,
  climbers: state.climbers
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchUser,
  fetchSchedule,
  fetchClimbers
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClimberList);
