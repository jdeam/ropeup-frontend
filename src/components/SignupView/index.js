import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import './Signup.css';

class Signup extends Component {
  state = {
    email: '',
    password: '',
    confirm: ''
  };

  render() {
    return (
      <div className="signup-container">
        <form className="signup-form">
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
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="password"
                placeholder="Confirm password"
                value={ this.state.confirm }
                onChange={ (e) => this.setState({ confirm: e.target.value }) }
              />
              <span className="icon is-small is-left">
                <FontAwesome name="check" />
              </span>
            </p>
          </div>
          <div className="field signup-buttons">
            <p className="control">
              <button className="button is-primary">
                Sign up
              </button>
            </p>
            <p className="control">
              <Link to="/login" className="button is-text is-size-7">
              Already signed up? Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
