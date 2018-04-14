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
  isFetching,
  match,
}) => {
  const matchingUser = matches[match.params.id];

  return isFetching ? (
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
          userSchedule={ schedule }
          matchSchedule={ matchingUser.schedule }
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
  matches: state.matchesById,
  isFetching: state.isFetchingMatches,
});

export default connect(
  mapStateToProps
)(MatchDetail);
