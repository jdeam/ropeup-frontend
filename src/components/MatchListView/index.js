import React, { Component } from 'react';
import MatchListItem from './MatchListItem';
import { fetchUser, fetchSchedule, fetchMatches } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './MatchList.css';

class MatchList extends Component {
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

  createMatchEls = () => {
    const { user, matches } = this.props;
    return matches.map((match, i) => {
      return <MatchListItem
        key={ i }
        zip={ user.zip }
        match={ match }
      />
    });
  };

  render() {
    return this.props.matches.length ? (
      <div className="matchlist-container">
        <div className="matchlist">
          { this.createMatchEls() }
        </div>
      </div>
    ) : (
      <div></div>
    )
  }
};

const mapStateToProps = (state) => ({
  token: state.token,
  user: state.user,
  matches: state.matches
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchUser,
  fetchSchedule,
  fetchMatches
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchList);
