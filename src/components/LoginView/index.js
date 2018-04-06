import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link, withRouter } from 'react-router-dom';
import { login } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Login.css';

class Login extends Component {
  state = {
    email: '',
    password: '',
    is_logging_in: false
  };

  componentDidMount() {
    if (JSON.parse(localStorage.getItem('token'))) {
      this.props.history.push('/dashboard');
    }
  }

  handleLogin = () => {
    const { email, password } = this.state;
    if (email && password) {
      this.setState({ is_logging_in: true });
      this.props.login(email, password, this.props.history);
    }
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

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Login));
