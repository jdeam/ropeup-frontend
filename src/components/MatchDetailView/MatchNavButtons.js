import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { sbAddChannel } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const MatchNavButtons = ({ match, fetchingSb, sbAddChannel }) => {
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
        <Link
          to={ `/messages/${match.id}`}
          className={ `button is-small is-info matchdetail-button${
            fetchingSb ? ' is-loading' : ""
          }` }
          onClick={ () => sbAddChannel(match.id) }
        >
         <span>{ `Message ${match.first_name}` }</span>
         <span className="icon">
           <FontAwesome name="comment" />
         </span>
       </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  fetchingSb: state.fetchingSb,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  sbAddChannel
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchNavButtons);
