import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { sbAddChannel } from '../../actions/sendbird';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const MatchMessageButton = ({
  match,
  channelsByUsername,
  sbAddChannel,
}) => {
  return (
    <div className="matchdetail-nav">
      <Link
        to={ `/messages/${match.username}`}
        className="button is-primary is-rounded matchdetail-button"
        onClick={ () => {
          if(!channelsByUsername[match.username]) {
            sbAddChannel(match.username);
          }
        } }
      >
       <span>{ `Message ${match.username}` }</span>
       <span className="icon">
         <FontAwesome name="comment" />
       </span>
     </Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  channelsByUsername: state.sbChannelsByUsername,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  sbAddChannel
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchMessageButton);
