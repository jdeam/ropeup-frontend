import React, { Component } from 'react';
import './Dashboard.css';

class DashboardEdit extends Component {
  state = {
    is_editing: false,
    zip: '',
    dob: '',
    start_year: '',
    gyms: '',
    tr: false,
    lead: false,
    grade_low: '',
    grade_high: ''
  };

  componentDidMount() {
    this.populateForm();
  }

  populateForm = () => {
    if (this.props.user) {
      this.setState({
        zip: this.props.user.zip || '',
        // dob: this.props.user.dob || '',
        start_year: this.props.user.start_year || '',
        gyms: this.props.user.gyms || '',
        tr: this.props.user.tr || false,
        lead: this.props.user.lead || false,
        grade_low: this.props.user.grade_low || '',
        grade_high: this.props.user.grade_high || ''
      });
    }
  };

  render() {
    return this.props.isActive ? (
      <div className="dashboard-edit-container">
        <div className="dashboard-edit">
          <div className="dashboard-edit-item">
            <div className="edit-label">My ZIP code is</div>
            <div className="zip-input">
              <input
                className="input is-small"
                type="text"
                placeholder="ZIP"
                readOnly={ !this.state.is_editing }
                value={ this.state.zip }
                onChange={ (e) => this.setState({ zip: e.target.value }) }
              />
            </div>
          </div>
          <div className="dashboard-edit-item">
            <div className="edit-label">My birthday is</div>
            <div className="birthday-input">
              <input
                className="input is-small"
                type="date"
                placeholder="mm/dd/yy"
                disabled={ !this.state.is_editing }
                value={ this.state.dob }
                onChange={ (e) => this.setState({ dob: e.target.value }) }
              />
            </div>
          </div>
          <div className="dashboard-edit-item">
            <div className="edit-label">I climb at</div>
            <div className="gym-input">
              <input
                className="input is-small"
                type="text"
                placeholder="gym(s)"
                readOnly={ !this.state.is_editing }
              />
            </div>
          </div>
          <div className="dashboard-edit-item">
            <div className="edit-label">I started climbing in</div>
            <div className="year-input">
              <input
                className="input is-small"
                type="text"
                placeholder="year"
                readOnly={ !this.state.is_editing }
                value={ this.state.start_year }
                onChange={ (e) => this.setState({ start_year: e.target.value }) }
              />
            </div>
          </div>
          <div className="dashboard-edit-item">
            <div className="edit-label">I like to</div>
            <div className="tags">
              <span
                className={
                  `tag ${this.state.tr ? 'is-info' : 'is-white'}`
                }
                onClick={ () => this.state.is_editing ?
                  this.setState({ tr: !this.state.tr }) : null
                }
              >Toprope
              </span>
              <span
                className={
                  `tag ${this.state.lead ? 'is-info' : 'is-white'}`
                }
                onClick={ () => this.state.is_editing ?
                  this.setState({ lead: !this.state.lead }) : null
                }
              >Lead
              </span>
            </div>
          </div>
          <div className="dashboard-edit-item">
            <div className="edit-label">... from</div>
            <div className="grade-start-input">
              <div class="select is-small">
                <select
                  disabled={ !this.state.is_editing }
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
            <div className="edit-label-mid">to</div>
            <div className="grade-end-input">
              <div class="select is-small">
                <select
                  disabled={ !this.state.is_editing }
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
          {
            this.state.is_editing ? (
              <div className="edit-buttons">
                <div
                  className="button is-text edit-cancel-button"
                  onClick={ () => {
                    this.setState({ is_editing: false});
                    this.populateForm();
                  } }
                >
                  Cancel
                </div>
                <div className="button is-info edit-submit-button">
                  Submit
                </div>
              </div>
            ) : (
              <div
                className="button is-info edit-info-button"
                onClick={ () => this.setState({ is_editing: true }) }
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

export default DashboardEdit;
