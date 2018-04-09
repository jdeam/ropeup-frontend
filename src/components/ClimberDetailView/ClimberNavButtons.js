import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const ClimberNavButtons = ({ climber }) => {

  return (
    <div className="climberdetail-nav-container">
      <div className="climberdetail-nav">
        <Link
          to="/climbers"
          className="button is-small climberdetail-button"
        >
         <span className="icon">
           <FontAwesome name="chevron-circle-left" />
         </span>
         <span>Back to matches</span>
       </Link>
        <a className="button is-small is-info climberdetail-button">
         <span>{ `Message ${climber.first_name}` }</span>
         <span className="icon">
           <FontAwesome name="comment" />
         </span>
        </a>
      </div>
    </div>
  );
}

export default ClimberNavButtons;
