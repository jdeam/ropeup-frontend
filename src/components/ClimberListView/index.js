import React from 'react';
import ClimberListEl from './ClimberListEl';
import { connect } from 'react-redux';
import './ClimberList.css';

const ClimberList = ({ history, user, schedule, climbers }) => {
  const token = JSON.parse(localStorage.getItem('token'));
  if (!token) history.push('/');
  if (!user) history.push('/dashboard');

  const climberEls = climbers.map((climber, i) => {
    return <ClimberListEl
      key={ i }
      user={ user }
      schedule={ schedule }
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
  schedule: state.schedule,
  climbers: state.climbers
});

export default connect(
  mapStateToProps,
)(ClimberList);
