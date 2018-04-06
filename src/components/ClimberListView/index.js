import React from 'react';
import ClimberListEl from './ClimberListEl';
import './ClimberList.css';

import users from './users';
const climbers = users.slice(0, 10);

const ClimberList = () => {

  const climberEls = climbers.map((climber, i) => {
    return <ClimberListEl key={ i } climber={ climber } />
  });

  return (
    <div className="climberlist-container">
      <div className="climberlist">
        { climberEls }
      </div>
    </div>
  );
}

export default ClimberList;
