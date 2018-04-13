import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { sbAddChannel } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const MatchNavButtons = ({ match, sbAddChannel }) => {

  return (
    <div className="matchdetail-nav-container">
      <div className="matchdetail-nav">
        <Link
          to="/matches"
          className="button is-small matchdetail-button"
        >
         <span className="icon">
           <FontAwesome name="chevron-circle-left" />
         </span>
         <span>Back to Matches</span>
       </Link>
        <a
          className="button is-small is-info matchdetail-button"
          onClick={ () => sbAddChannel(match.email) }
        >
         <span>{ `Message ${match.first_name}` }</span>
         <span className="icon">
           <FontAwesome name="comment" />
         </span>
        </a>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  sbAddChannel
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(MatchNavButtons);
