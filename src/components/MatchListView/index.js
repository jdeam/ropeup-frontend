import React from 'react';
import MatchListItem from './MatchListItem';
import { Link } from 'react-router-dom';
import { switchDashboardTab } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './MatchList.css';

const MatchList = ({ token, user, matches, history, switchDashboardTab }) => {
  if (!token) history.push('/');

  const matchEls =  matches.map((match, i) => {
    return <MatchListItem key={ i } zip={ user.zip } match={ match } />
  });

  return matches.length ? (
    <div className="matchlist-container">
      <div className="matchlist">
        { matchEls }
      </div>
    </div>
  ) : (
    <div className="matchlist-empty-container">
      <div className="matchlist-empty-message">
        No matches found
      </div>
      <div className="matchlist-empty-links">
        Complete your&nbsp;
        <Link
          to="/dashboard"
          onClick={ () => switchDashboardTab('edit') }
        >
          profile
        </Link>
        &nbsp;and fill out your&nbsp;
        <Link
          to="/dashboard"
          onClick={ () => switchDashboardTab('schedule') }
        >
          schedule
        </Link>
        &nbsp;to see more matches.
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.token,
  user: state.user,
  matches: state.matches
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  switchDashboardTab
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchList);