import React from 'react';
import MatchImage from './MatchImage';
import MatchSchedule from './MatchSchedule';
import MatchContent from './MatchContent';
import { ClipLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './MatchDetail.css';

const MatchDetail = ({
  user,
  schedule,
  matchesByUsername,
  isFetching,
  match,
  history,
}) => {
  window.scrollTo(0, 0);

  const matchingUser = matchesByUsername[match.params.username];

  return isFetching ? (
    <div className="matchdetail-empty-container">
      <div className="matchdetail-empty-message">
        <ClipLoader
          color={'#5BCDB3'}
          size={100}
        />
      </div>
    </div>
  ) : matchingUser ? (
    <div className="matchdetail-container">
      <div className="matchdetail">
        <MatchImage
          history={ history }
          match={ matchingUser }
          zip={ user.zip }
        />
        <div className="matchdetail-divider"></div>
        <MatchSchedule
          userSchedule={ schedule }
          matchSchedule={ matchingUser.schedule }
          matchGym={ matchingUser.gym_id }
        />
        <div className="matchdetail-divider"></div>
        <MatchContent match={ matchingUser } />
      </div>
    </div>
  ) : (
    <Redirect to="/matches" />
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  schedule: state.schedule,
  matchesByUsername: state.matchesByUsername,
  isFetching: state.isFetchingMatches,
});

export default connect(
  mapStateToProps
)(MatchDetail);
