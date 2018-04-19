import React from 'react';
import MatchImage from './MatchImage';
import MatchMessageButton from './MatchNavButton';
import MatchSchedule from './MatchSchedule';
import MatchContent from './MatchContent';
import { ClipLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './MatchDetail.css';

const MatchDetail = ({
  user,
  schedule,
  matchesById,
  isFetching,
  match,
  history,
}) => {
  window.scrollTo(0, 0);

  const matchingUser = matchesById[match.params.id];

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
          matchGym={ matchingUser.gym }
          userGym={ user.gym }
        />
        <div className="matchdetail-divider"></div>
        <MatchContent match={ matchingUser } />
        <MatchMessageButton matchingUser={ matchingUser } />
      </div>
    </div>
  ) : (
    <Redirect to="/matches" />
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  schedule: state.schedule,
  matchesById: state.matchesById,
  isFetching: state.isFetchingMatches,
});

export default connect(
  mapStateToProps
)(MatchDetail);
