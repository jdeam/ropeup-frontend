import React from 'react';
import MatchImage from './MatchImage';
import MatchNavButtons from './MatchNavButtons';
import MatchSchedule from './MatchSchedule';
import MatchContent from './MatchContent';
import { connect } from 'react-redux';
import './MatchDetail.css';

const MatchDetail = ({
  token,
  user,
  schedule,
  matches,
  history,
  match
}) => {
  if (!token) history.push('/');
  const { id } = match.params;
  const matchingUser = matches[id];
  if (!matchingUser) history.push('/matches');

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
  );
};

const mapStateToProps = (state) => ({
  token: state.token,
  user: state.user,
  schedule: state.scheduleByDay,
  matches: state.matchesById
});

export default connect(
  mapStateToProps,
)(MatchDetail);
