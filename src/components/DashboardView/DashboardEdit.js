import React, { Component } from 'react';
import { fetchUser } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import BaseURL from '../../BaseURL';
import './Dashboard.css';

class DashboardEdit extends Component {
  state = {
    isEditing: false,
    isSubmitting: false,
    zip: '',
    dob: '',
    start_year: '',
    gyms: '',
    tr: false,
    lead: false,
    grade_low: '',
    grade_high: '',
    about: ''
  };

  componentDidMount() {
    this.populateForm();
  }

  populateForm = () => {
    if (this.props.user) {
      this.setState({
        zip: this.props.user.zip || '',
        dob: this.props.user.dob || '',
        start_year: this.props.user.start_year || '',
        gyms: this.props.user.gyms || '',
        tr: this.props.user.tr || false,
        lead: this.props.user.lead || false,
        grade_low: this.props.user.grade_low || '',
        grade_high: this.props.user.grade_high || '',
        about: this.props.user.about || ''
      });
    }
  };

  submitEdits = async () => {
    const { isEditing, isSubmitting, ...editBody } = this.state;
    const token = JSON.parse(localStorage.getItem('token'));
    this.setState({ isSubmitting: true });
    const response = await axios.patch(
      `${BaseURL}/users/${this.props.user.id}`,
      editBody,
      { headers: { token } }
    );
    if (response.status === 200) {
      this.props.fetchUser(token);
      this.setState({
        isEditing: false,
        isSubmitting: false
      });
    }
  };

  render() {
    return this.props.isActive ? (
      <div className="dashboard-form-container">
        <div className="dashboard-form">
          <div className="dashboard-form-item">
            <div className="form-label">
              My ZIP code is
            </div>
            <div className="zip-input">
              <input
                className="input"
                type="text"
                placeholder="ZIP"
                disabled={ !this.state.isEditing }
                value={ this.state.zip }
                onChange={ (e) => this.setState({ zip: e.target.value }) }
              />
            </div>
          </div>
          <div className="dashboard-form-item">
            <div className="form-label">
              My birthday is
            </div>
            <div className="birthday-input">
              <input
                className="input"
                type="date"
                placeholder="mm/dd/yy"
                disabled={ !this.state.isEditing }
                value={ this.state.dob }
                onChange={ (e) => this.setState({ dob: e.target.value }) }
              />
            </div>
          </div>
          <div className="dashboard-form-item">
            <div className="form-label">
              I climb at
            </div>
            <div className="gym-input">
              <input
                className="input"
                type="text"
                placeholder="gym(s)"
                disabled={ !this.state.isEditing }
                value={ this.state.gyms }
                onChange={ (e) => this.setState({ gyms: e.target.value }) }
              />
            </div>
          </div>
          <div className="dashboard-form-item">
            <div className="form-label">
              I started climbing in
            </div>
            <div className="year-input">
              <input
                className="input"
                type="text"
                placeholder="year"
                disabled={ !this.state.isEditing }
                value={ this.state.start_year }
                onChange={ (e) => this.setState({ start_year: e.target.value }) }
              />
            </div>
          </div>
          <div className="dashboard-form-item">
            <div className="form-label">
              I like to
            </div>
            <div className="tags">
              <span
                className={
                  `tag is-medium ${this.state.tr ? 'is-dark' :
                  this.state.isEditing ? 'is-white' : 'is-light'}`
                }
                onClick={ () => this.state.isEditing ?
                  this.setState({ tr: !this.state.tr }) : null
                }
              >
                Toprope
              </span>
              <span
                className={
                  `tag is-medium ${this.state.lead ? 'is-dark' :
                  this.state.isEditing ? 'is-white' : 'is-light'}`
                }
                onClick={ () => this.state.isEditing ?
                  this.setState({ lead: !this.state.lead }) : null
                }
              >
                Lead
              </span>
            </div>
          </div>
          <div className="dashboard-form-item">
            <div className="form-label">
              ... from
            </div>
            <div className="grade-select">
              <div className="select">
                <select
                  disabled={ !this.state.isEditing }
                  value={ this.state.grade_low }
                  onChange={ (e) => this.setState({ grade_low: e.target.value }) }
                >
                  <option>5.7</option>
                  <option>5.8</option>
                  <option>5.9</option>
                  <option>5.10a</option>
                  <option>5.10b</option>
                  <option>5.10c</option>
                  <option>5.10d</option>
                  <option>5.11a</option>
                  <option>5.11b</option>
                  <option>5.11c</option>
                  <option>5.11d</option>
                  <option>5.12a</option>
                  <option>5.12b</option>
                  <option>5.12c</option>
                  <option>5.12d</option>
                </select>
              </div>
            </div>
            <div className="form-label-mid">
              to
            </div>
            <div className="grade-select">
              <div className="select">
                <select
                  disabled={ !this.state.isEditing }
                  value={ this.state.grade_high }
                  onChange={ (e) => this.setState({ grade_high: e.target.value }) }
                >
                  <option>5.7</option>
                  <option>5.8</option>
                  <option>5.9</option>
                  <option>5.10a</option>
                  <option>5.10b</option>
                  <option>5.10c</option>
                  <option>5.10d</option>
                  <option>5.11a</option>
                  <option>5.11b</option>
                  <option>5.11c</option>
                  <option>5.11d</option>
                  <option>5.12a</option>
                  <option>5.12b</option>
                  <option>5.12c</option>
                  <option>5.12d</option>
                </select>
              </div>
            </div>
          </div>
          <div className="dashboard-form-item">
            <div className="about-input">
              <textarea
                className="textarea is-small"
                type="text"
                placeholder="About me (optional)"
                disabled={ !this.state.isEditing }
                value={ this.state.about }
                onChange={ (e) => this.setState({ about: e.target.value }) }
              />
            </div>
          </div>
          {
            this.state.isEditing ? (
              <div className="edit-buttons">
                <div
                  className="button is-text edit-cancel-button"
                  onClick={ () => {
                    this.setState({ isEditing: false});
                    this.populateForm();
                  } }
                >
                  Cancel
                </div>
                <div
                  className={`button is-info edit-submit-button${
                    this.state.isSubmitting ? ' is-loading' : ''
                  }`}
                  onClick={ () => this.submitEdits() }
                >
                  Submit
                </div>
              </div>
            ) : (
              <div
                className="button is-info edit-info-button"
                onClick={ () => this.setState({ isEditing: true }) }
              >
                Edit info
              </div>
            )
          }
        </div>
      </div>
    ) : (
      <div></div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchUser
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardEdit);
