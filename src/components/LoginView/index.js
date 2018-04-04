import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { login } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Login.css';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  handleLogin = () => {
    const { email, password } = this.state;
    if (email && password) this.props.login(email, password);
  }

  render() {
    return (
      <div className="login-container">
        <form
          className="login-form"
          onSubmit={ (e) => {
            e.preventDefault();
            this.handleLogin();
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
            <p className="control">
              <button className="button is-primary">
                Login
              </button>
            </p>
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

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login
}, dispatch);

export default connect(
  null, mapDispatchToProps
)(Login);
