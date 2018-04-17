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
    isLoggingIn: false,
  };

  login = async () => {
    const { isLoggingIn, ...loginBody } = this.state;
    if (loginBody.email && loginBody.password) {
      this.setState({ isLoggingIn: true });
      const response = await axios.post(`${BaseURL}/auth/login`, loginBody);
      if (response.status === 200) {
        const token = response.headers.auth.split(' ')[1];
        localStorage.setItem('token', token);
        const { history, fetchAllUserInfo } = this.props;
        fetchAllUserInfo();
        history.push('/dashboard');
      }
    }
  }

  render() {
    return (
      <div className="login-container">
        <form
          className="login-form"
          onSubmit={ (e) => {
            e.preventDefault();
            this.login();
          } }
        >
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input is-primary"
                id="email"
                type="email"
                placeholder="Email"
                value={ this.state.email }
                onChange={
                  (e) => this.setState({ email: e.target.value })
                }
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
                onChange={
                  (e) => this.setState({ password: e.target.value })
                }
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
                className={ `button login-button is-inverted is-primary${
                  this.state.isLoggingIn ? ' is-loading' : ''
                }`}
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
