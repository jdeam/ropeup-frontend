import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { sbAddChannel } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const MatchMessageButton = ({
  match,
  channelsByOtherUserId,
  sbAddChannel,
}) => {
  return (
    <div className="matchdetail-nav">
      <Link
        to={ `/messages/${match.id}`}
        className="button is-primary is-rounded matchdetail-button"
        onClick={ () => {
          if(!channelsByOtherUserId[match.id]) {
            sbAddChannel(match.id);
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
  channelsByOtherUserId: state.sbChannelsByOtherUserId,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  sbAddChannel
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchMessageButton);
