import React from 'react';
import MatchListItem from './MatchListItem';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { switchDashboardTab } from '../../actions/window';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './MatchList.css';

const MatchList = ({
  user,
  matches,
  isFetching,
  switchDashboardTab
}) => {
  window.scrollTo(0, 0);
  const matchEls =  matches.map((match, i) => {
    return <MatchListItem key={ i } zip={ user.zip } match={ match } />
  });

  return isFetching ? (
    <div className="matchlist-empty-container">
      <div className="matchlist-empty-message matchlist-spinner">
        <ClipLoader
          color={'#5BCDB3'}
          size={100}
        />
      </div>
    </div>
  ) : matches.length ? (
    <div className="matchlist-container">
      <div className="matchlist">
        <h1 className="matchlist-title">
          Matches
        </h1>
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
        &nbsp;and update your&nbsp;
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
  user: state.user,
  matches: state.matches,
  isFetching: state.isFetchingMatches,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  switchDashboardTab,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchList);
