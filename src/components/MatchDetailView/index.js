import React, { Component } from 'react';
import MatchImage from './MatchImage';
import MatchNavButtons from './MatchNavButtons';
import MatchSchedule from './MatchSchedule';
import MatchContent from './MatchContent';
import { fetchUser, fetchSchedule, fetchMatches } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './MatchDetail.css';

class MatchDetail extends Component {
  state = {
    isLoading: false
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchUserInfo();
  }

  fetchUserInfo = () => {
    const {
      token,
      history,
      fetchUser,
      fetchSchedule,
      fetchMatches
    } = this.props;
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
            return fetchMatches(token, zip, schedule);
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
    const { matches, match, user, schedule } = this.props;
    const { id } = match.params;
    const matchingUser = matches[id];

    return matchingUser ? (
      <div className="matchdetail-container">
        <div className="matchdetail">
          <MatchImage
            match={ matchingUser }
            zip={ user.zip }
          />
          <MatchNavButtons match={ matchingUser } />
          <div className="matchdetail-divider"></div>
          <MatchSchedule
            userSched={ schedule }
            matchSched={ matchingUser.schedule }
          />
          <div className="matchdetail-divider"></div>
          <MatchContent match={ matchingUser } />
        </div>
      </div>
    ) : (
      <div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  user: state.user,
  schedule: state.scheduleByDay,
  matches: state.matchesById
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchUser,
  fetchSchedule,
  fetchMatches
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchDetail);
