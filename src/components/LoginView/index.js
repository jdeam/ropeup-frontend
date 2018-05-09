import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllUserInfo } from '../../actions';
import axios from 'axios';
import './Login.css';
const BaseURL = process.env.REACT_APP_BASE_URL;

class Login extends Component {
  state = {
    email: '',
    password: '',
    loginDisabled: true,
    isLoggingIn: false,
    loginError: '',
  };

  handleLogin = async (e) => {
    e.preventDefault();
    const { isLoggingIn, ...loginBody } = this.state;
    if (loginBody.email && loginBody.password) {
      this.setState({ isLoggingIn: true });
      try {
        const response = await axios.post(`${BaseURL}/auth/login`, loginBody);
        const token = response.headers.auth.split(' ')[1];
        localStorage.setItem('token', token);
        const { history, fetchAllUserInfo } = this.props;
        fetchAllUserInfo();
        return history.push('/dashboard');
      } catch(err) {
        this.setState({
          loginDisabled: true,
          isLoggingIn: false,
          loginError: 'Your email and/or password is incorrect.',
        });
      }
    }
  }

  handleFormFocus = () => {
    if (this.state.loginError) {
      this.setState({
        email: '',
        password: '',
        loginError: '',
      });
    } 
  };

  handleEmailInput = async (e) => {
    await this.setState({ email: e.target.value });
    this.updateDisabledState();
  };

  handlePasswordInput = async (e) => {
    await this.setState({ password: e.target.value });
    this.updateDisabledState();
  };

  getButtonState = () => {
    return `button login-button is-inverted is-primary${
      this.state.isLoggingIn ? ' is-loading' : ''
    }` ;
  };

  updateDisabledState = () => {
    const { loginDisabled, email, password } = this.state;
    if (loginDisabled && email && password) {
      return this.setState({ loginDisabled: false });
    }
    if (!loginDisabled && (!email || !password)) {
      this.setState({ loginDisabled: true });
    }
  };

  render() {
    return (
      <div className="login-container">
        <div className="login">
          <h1 className="login-ropeup is-size-1">
            RopeUp
          </h1>
          <figure className="image login-ropeup-logo">
            <img
              src="/images/ropeup-logo.svg" alt="" />
          </figure>
          <form
            className="login-form"
            onSubmit={ this.handleLogin }
          >
            <div className="field">
              <p className="help is-danger">{ this.state.loginError }</p>
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input is-primary"
                  id="email"
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
                  id="password"
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
            <div className="field login-buttons">
              <p className="control">
                <button
                  id="login"
                  disabled={ this.state.loginDisabled}
                  className={ this.getButtonState() }
                >
                  Login
                </button>
              </p>
              <p className="control">
                <Link to="/signup" className="button is-text create-account-button">
                  Create an account
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
)(Login);
