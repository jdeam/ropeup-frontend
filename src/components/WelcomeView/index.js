import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../../actions/user';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import validZips from '../../util/validZips';
import './Welcome.css';
const BaseURL = process.env.REACT_APP_BASE_URL;

class Welcome extends Component {
  state = {
    zip: '',
    start_year: '',
    isDisabled: true,
    isUpdating: false,
  };

  updateUser = async (e) => {
    e.preventDefault();
    const { isDisabled, isUpdating, ...updateBody } = this.state;
    const { 
      token, 
      user, 
      history, 
      fetchUser, 
    } = this.props;
   if (isDisabled) return;
   this.setState({ isUpdating: true });
   const response = await axios.patch(
     `${BaseURL}/users/${user.id}`,
     updateBody,
     { headers: { token } }
   );
   if (response.status === 200) {
     this.setState({ isUpdating: false });
     fetchUser();
     history.push('/dashboard');
   }
  };

  handleZipChange = async (e) => {
    await this.setState({ zip: e.target.value });
    this.updateDisabledStatus();
  };

  handleYearChange = async (e) => {
    await this.setState({ start_year: e.target.value });
    this.updateDisabledStatus();
  };

  validateZipInput = () => {
    const { zip } = this.state;
    return validZips.includes(zip);
  };

  validateYearInput = () => {
    const { start_year } = this.state;
    if (start_year.length !== 4) return false;
    if (start_year.slice(0, 2) !== '19' && start_year.slice(0, 2) !== '20') return false;
    if (parseInt(start_year, 10) > 2018) return false;
    return true;
  };

  updateDisabledStatus = () => {
    const { isDisabled } = this.state;
    if (isDisabled) {
      if (this.validateZipInput() && this.validateYearInput()) {
        this.setState({ isDisabled: false });
      }
    } else {
      if (!this.validateZipInput() || !this.validateYearInput()) {
        this.setState({ isDisabled: true });
      }
    }
  };

  getButtonClass = () => {
    return `button welcome-button is-primary${
      this.state.isUpdating ? ' is-loading' : ''
    }`;
  };

  render() {
    return this.props.isFetching ? (
      <div className="welcome-empty-container">
        <div className="welcome-empty-message">
          <ClipLoader
            color={'#5BCDB3'}
            size={100}
          />
        </div>
      </div>
    ) : (
      <div className="welcome-container">
        <div className="welcome">
          <h1 className="title is-2 welcome-title">
            Welcome to RopeUp
          </h1>
          <h2 className="is-size-4 welcome-message">
            Tell us a bit about yourself
          </h2>
          <form
            className="welcome-form"
            onSubmit={ this.updateUser }
          >
            <div className="field">
              <label className="label welcome-label">My ZIP code is ...</label>
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input is-primary"
                  type="number"
                  placeholder="ZIP"
                  value={ this.state.zip }
                  onChange={ this.handleZipChange }
                />
                <span className="icon is-small is-left">
                  <FontAwesome name="globe" />
                </span>
              </p>
            </div>
            <div className="field">
              <label className="label welcome-label">I started climbing in ...</label>
              <p className="control has-icons-left">
                <input
                  className="input is-primary"
                  type="number"
                  placeholder="Year"
                  value={ this.state.start_year }
                  onChange={ this.handleYearChange }
                />
                <span className="icon is-small is-left">
                  <FontAwesome name="calendar" />
                </span>
              </p>
            </div>
            <div className="field continue-button">
              <p className="control">
                <button
                  disabled={ this.state.isDisabled }
                  className={ this.getButtonClass() }
                >
                  Continue
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  user: state.user,
  isFetching: state.isFetchingUser,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchUser,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
