import React from 'react';
import MatchListItem from './MatchListItem';
import { connect } from 'react-redux';
import './MatchList.css';

const MatchList = ({ token, user, matches, history}) => {
  if (!token) history.push('/');
  window.scrollTo(0, 0);

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
    <div></div>
  );
};

const mapStateToProps = (state) => ({
  token: state.token,
  user: state.user,
  matches: state.matches
});

export default connect(
  mapStateToProps,
)(MatchList);
