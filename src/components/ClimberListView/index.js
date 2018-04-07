import React, { Component } from 'react';
import ClimberListEl from './ClimberListEl';
import { withRouter } from 'react-router-dom';
import { fetchClimbers, fetchUser } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './ClimberList.css';

class ClimberList extends Component {
  componentDidMount() {
    if (!this.props.user) return this.props.history.push('/dashboard');
    const token = JSON.parse(localStorage.getItem('token'));
    const zip = this.props.user.zip;
    return this.props.fetchClimbers(token, zip);
  }

  createList = () => {
    return this.props.climbers.map((climber, i) => {
      return <ClimberListEl
        key={ i }
        user={ this.props.user }
        climber={ climber }
      />
    });
  };

  render() {
    return (
      <div className="climberlist-container">
        <div className="climberlist">
          { this.createList() }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  climbers: state.climbers
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchClimbers,
  fetchUser
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ClimberList));
