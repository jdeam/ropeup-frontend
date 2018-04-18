import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import './Welcome.css';

class Welcome extends Component {
  state = {
    zip: '',
    start_year: ''
  };

  updateUser = () => {

  };

  render() {
    return (
      <div className="welcome-container">
        <form
          className="welcome-form"
          onSubmit={ (e) => {
            e.preventDefault();
            this.updateUser();
          } }
        >
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input is-primary"
                type="number"
                placeholder="ZIP"
                value={ this.state.zip }
                onChange={
                  (e) => this.setState({ zip: e.target.value })
                }
              />
              <span className="icon is-small is-left">
                <FontAwesome name="globe" />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input is-primary"
                type="number"
                placeholder="Year"
                value={ this.state.start_year }
                onChange={
                  (e) => this.setState({ start_year: e.target.value })
                }
              />
              <span className="icon is-small is-left">
                <FontAwesome name="calendar" />
              </span>
            </p>
          </div>
          <div className="field continue-button">
            <p className="control">
              <button
                className={ `button login-button is-inverted is-primary${
                  this.state.isLoggingIn ? ' is-loading' : ''
                }`}
              >
                Continue
              </button>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default Welcome;
