import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { signup } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Signup.css';

class Signup extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm: ''
  };

  handleSignup = () => {
    const { first_name, last_name, email, password, confirm } = this.state;
    if (
      first_name &&
      last_name &&
      email &&
      password &&
      password === confirm
    ) {
      this.props.signup(first_name, last_name, email, password);
    }
  }

  render() {
    return (
      <div className="signup-container">
        <form
          className="signup-form"
          onSubmit={ (e) => {
            e.preventDefault();
            this.handleSignup();
          } }
        >
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="First name"
                value={ this.state.first_name }
                onChange={ (e) => this.setState({ first_name: e.target.value }) }
              />
              <span className="icon is-small is-left">
                <FontAwesome name="user" />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Last name"
                value={ this.state.last_name }
                onChange={ (e) => this.setState({ last_name: e.target.value }) }
              />
              <span className="icon is-small is-left">
                <FontAwesome name="user" />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
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
              <button className="button is-info">
                Sign up
              </button>
            </p>
            <p className="control">
              <Link to="/" className="button is-text is-size-7">
                Already signed up? Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  signup
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Signup);
