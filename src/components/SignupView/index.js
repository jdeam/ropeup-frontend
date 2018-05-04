import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllUserInfo } from '../../actions';
import axios from 'axios';
import './Signup.css';
const BaseURL = process.env.REACT_APP_BASE_URL;

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    signupDisabled: true,
    isSigningUp: false,
    signupError: '',
  };

  handleSignup = async (e) => {
    e.preventDefault();
    const { isSigningUp, ...signupBody } = this.state;
    if (
      signupBody.username &&
      signupBody.email &&
      signupBody.password
    ) {
      this.setState({ isSigningUp: true });
      try {
        const response = await axios.post(`${BaseURL}/auth/signup`, signupBody);
        const token = response.headers.auth.split(' ')[1];
        localStorage.setItem('token', token);
        const { fetchAllUserInfo, history } = this.props;
        fetchAllUserInfo();
        history.push('/welcome');
      } catch(err) {
        this.setState({
          signupDisabled: true,
          isSigningUp: false,
          signupError: err.response.data.message,
        });
      }
    }
  }

  handleFormFocus = () => {
    if (this.state.signupError) {
      this.setState({
        username: '',
        email: '',
        password: '',
        signupError: '',
      });
    } 
  };

  handleUsernameInput = async (e) => {
    await this.setState({ username: e.target.value });
    this.updateDisabledState();
  };

  handleEmailInput = async (e) => {
    await this.setState({ email: e.target.value });
    this.updateDisabledState();
  };

  handlePasswordInput = async (e) => {
    await this.setState({ password: e.target.value });
    this.updateDisabledState();
  };

  updateDisabledState = () => {
    const { signupDisabled, username, email, password } = this.state;
    if (signupDisabled && username && email && password) {
      return this.setState({ signupDisabled: false });
    }
    if (!signupDisabled && (!username || !email || !password)) {
      this.setState({ signupDisabled: true });
    }
  };

  render() {
    return (
      <div className="signup-container">
        <div className="signup">
          <figure className="image signup-ropeup-logo">
            <img
              src="/images/ropeup-logo.svg" alt="" />
          </figure>
          <form
            className="signup-form"
            onSubmit={ this.handleSignup }
          >
            <div className="field">
              <p className="help is-danger">{ this.state.signupError }</p>
              <p className="control has-icons-left">
                <input
                  className="input is-primary"
                  type="text"
                  placeholder="Username"
                  value={ this.state.username }
                  onFocus={ this.handleFormFocus }
                  onChange={ this.handleUsernameInput }
                />
                <span className="icon is-small is-left">
                  <FontAwesome name="user-circle" />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input is-primary"
                  type="email"
                  placeholder="Email"
                  value={ this.state.email }
                  onFocus={ this.handleFormFocus }
                  onChange={ this.handleEmailInput }
                />
                <span className="icon is-small is-left">
                  <FontAwesome name="envelope" />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input is-primary"
                  type="password"
                  placeholder="Password"
                  value={ this.state.password }
                  onFocus={ this.handleFormFocus }
                  onChange={ this.handlePasswordInput }
                />
                <span className="icon is-small is-left">
                  <FontAwesome name="lock" />
                </span>
              </p>
            </div>
            <div className="field signup-buttons">
              <p className="control">
                <button
                disabled={ this.state.signupDisabled }
                  className={ `button signup-button is-inverted is-primary${
                    this.state.isSigningUp ? ' is-loading' : ''
                  }`}
                >
                  Sign up
                </button>
              </p>
              <p className="control">
                <Link
                  to="/login"
                  className="button is-text is-size-7 goto-login-button"
                >
                  Already signed up? Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchAllUserInfo,
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Signup);
