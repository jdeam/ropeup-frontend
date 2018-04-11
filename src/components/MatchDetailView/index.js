import React from 'react';
import MatchImage from './MatchImage';
import MatchNavButtons from './MatchNavButtons';
import MatchSchedule from './MatchSchedule';
import MatchContent from './MatchContent';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './MatchDetail.css';

const MatchDetail = ({
  user,
  schedule,
  matches,
  fetchingMatches,
  match,
}) => {
  const matchingUser = matches[match.params.id];

  return fetchingMatches ? (
    <div className="matchdetail-empty-container">
      <div className="matchdetail-empty-message">
        <FontAwesome className="fa-4x fa-spin" name="spinner" />
      </div>
    </div>
  ) : matchingUser ? (
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
    <Redirect to="/matches" />
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  schedule: state.scheduleByDay,
  matches: state.matchesById,
  fetchingMatches: state.fetchingMatches,
});

export default connect(
  mapStateToProps
)(MatchDetail);
