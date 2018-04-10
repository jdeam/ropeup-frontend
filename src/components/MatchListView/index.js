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
    const { token, history } = this.props;
    if (!token) return history.push('/');
    window.scrollTo(0, 0);
  }

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
