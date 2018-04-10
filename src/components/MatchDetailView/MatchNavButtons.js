import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const MatchNavButtons = ({ match }) => {

  return (
    <div className="matchdetail-nav-container">
      <div className="matchdetail-nav">
        <Link
          to="/matches"
          className="button is-small climberdetail-button"
        >
         <span className="icon">
           <FontAwesome name="chevron-circle-left" />
         </span>
         <span>Back to matches</span>
       </Link>
        <a className="button is-small is-info matchdetail-button">
         <span>{ `Message ${match.first_name}` }</span>
         <span className="icon">
           <FontAwesome name="comment" />
         </span>
        </a>
      </div>
    </div>
  );
}

export default MatchNavButtons;
