import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import BaseURL from '../../BaseURL';
import './Login.css';

class Login extends Component {
  state = {
    email: '',
    password: '',
    is_logging_in: false
  };

  login = async () => {
    const { email, password } = this.state;
    if (email && password) {
      const loginBody = { email, password };
      this.setState({ is_logging_in: true });
      const response = await axios.post(`${BaseURL}/auth/login`, loginBody);
      if (response.status === 200) {
        const token = response.headers.auth.split(' ')[1];
        localStorage.setItem('token', JSON.stringify(token));
        this.props.history.push('/dashboard');
      }
    }
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem('token'))) {
      this.props.history.push('/dashboard');
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
                className="input"
                type="email"
                placeholder="Email"
                value={ this.state.email }
                onChange={ (e) => this.setState({ email: e.target.value }) }
              />
              <span className="icon is-small is-left">
                <FontAwesome name="envelope" />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="password"
                placeholder="Password"
                value={ this.state.password }
                onChange={ (e) => this.setState({ password: e.target.value }) }
              />
              <span className="icon is-small is-left">
                <FontAwesome name="lock" />
              </span>
            </p>
          </div>
          <div className="field login-buttons">
            {
              this.state.is_logging_in ? (
                <p className="control">
                  <button className="button is-info is-loading">
                    Loading
                  </button>
                </p>
              ) : (
                <p className="control">
                  <button className="button is-info">
                    Login
                  </button>
                </p>
              )
            }
            <p className="control">
              <Link to="/signup" className="button is-text">
              Create an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user_id: state.user_id
})

export default withRouter(connect(
  mapStateToProps,
)(Login));
