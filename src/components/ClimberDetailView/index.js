import React, { Component } from 'react';
import ClimberImage from './ClimberImage';
import ClimberNavButtons from './ClimberNavButtons';
import ClimberSchedule from './ClimberSchedule';
import ClimberContent from './ClimberContent';
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
    const { climbers, match, user, schedule } = this.props;
    const { id } = match.params;
    const climber = climbers[id];

    return climber ? (
      <div className="climberdetail-container">
        <div className="climberdetail">
          <ClimberImage
            climber={ climber }
            zip={ user.zip }
          />
          <ClimberNavButtons climber={ climber } />
          <div className="climberdetail-divider"></div>
          <ClimberSchedule
            userSched={ schedule }
            climberSched={ climber.schedule }
            gyms={ climber.gyms }
          />
          <div className="climberdetail-divider"></div>
          <ClimberContent climber={ climber } />
        </div>
      </div>
    ) : (
      <div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  schedule: state.scheduleByDay,
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
