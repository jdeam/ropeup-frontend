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
    isSigningUp: false,
  };

  signup = async () => {
    const { isSigningUp, ...signupBody } = this.state;
    if (
      signupBody.username &&
      signupBody.email &&
      signupBody.password
    ) {
      this.setState({ isSigningUp: true });
      const response = await axios.post(`${BaseURL}/auth/signup`, signupBody);
      if (response.status === 200) {
        const token = response.headers.auth.split(' ')[1];
        localStorage.setItem('token', token);
        const { fetchAllUserInfo, history } = this.props;
        fetchAllUserInfo();
        history.push('/dashboard');
      }
    }
  }

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
            onSubmit={ (e) => {
              e.preventDefault();
              this.signup();
            } }
          >
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input is-primary"
                  type="text"
                  placeholder="Username"
                  value={ this.state.username }
                  onChange={ (e) => this.setState({ username: e.target.value }) }
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
                  className="input is-primary"
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
            <div className="field signup-buttons">
              {
                this.state.is_logging_in ? (
                  <p className="control">
                    <button className="button is-primary is-loading">
                      Loading
                    </button>
                  </p>
                ) : (
                  <p className="control">
                    <button
                      className={ `button signup-button is-inverted is-primary${
                        this.state.isSigningUp ? ' is-loading' : ''
                      }`}
                    >
                      Sign up
                    </button>
                  </p>
                )
              }
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
