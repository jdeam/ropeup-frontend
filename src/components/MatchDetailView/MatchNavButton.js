import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { sbAddChannel } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const MatchMessageButton = ({
  matchingUser,
  channelsByOtherUserId,
  sbAddChannel,
}) => {
  return (
    <div className="matchdetail-nav-container">
      <div className="matchdetail-nav">
        <Link
          to={ `/messages/${matchingUser.id}`}
          className="button is-primary is-rounded matchdetail-button"
          onClick={ () => {
            if(!channelsByOtherUserId[matchingUser.id]) {
              sbAddChannel(matchingUser.id);
            }
          } }
        >
         <span>{ `Message ${matchingUser.username}` }</span>
         <span className="icon">
           <FontAwesome name="comment" />
         </span>
       </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  channelsByOtherUserId: state.sbChannelsByOtherUserId,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  sbAddChannel
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchMessageButton);
