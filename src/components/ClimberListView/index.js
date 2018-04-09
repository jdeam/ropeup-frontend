import React from 'react';
import ClimberListItem from './ClimberListItem';
import { connect } from 'react-redux';
import './ClimberList.css';

const ClimberList = ({ history, user, climbers }) => {
  const token = JSON.parse(localStorage.getItem('token'));
  if (!token) history.push('/');
  if (!user) history.push('/dashboard');

  const climberEls = climbers.map((climber, i) => {
    return <ClimberListItem
      key={ i }
      zip={ user.zip }
      climber={ climber }
    />
  });

  return climbers.length ? (
    <div className="climberlist-container">
      <div className="climberlist">
        { climberEls }
      </div>
    </div>
  ) : (
    <div></div>
  )
};

const mapStateToProps = (state) => ({
  user: state.user,
  climbers: state.climbers
});

export default connect(
  mapStateToProps,
)(ClimberList);
