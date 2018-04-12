import React, { Component } from 'react';
import { sbFetchChannels } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './ChatList.css';

class ChatList extends Component {
  componentDidMount() {
    this.props.sbFetchChannels();
  }

  render() {
    return (
      <div>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  sbFetchChannels
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(ChatList);
