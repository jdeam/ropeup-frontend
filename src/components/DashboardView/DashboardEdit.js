import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { fetchUser } from '../../actions/user';
import { fetchMatches, clearMatches } from '../../actions/matches';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gyms } from '../../util/climbing';
import zipcodes from 'zipcodes';
import axios from 'axios';
import './Dashboard.css';
const BaseURL = process.env.REACT_APP_BASE_URL;

class DashboardEdit extends Component {
  state = {
    isEditing: false,
    isSubmitting: false,
    zip: '',
    start_year: '',
    gym: '',
    tr: false,
    lead: false,
    grade_low: 0,
    grade_high: 0,
    about: '',
  };

  componentDidMount() {
    this.populateForm();
  }

  populateForm = () => {
    if (this.props.user) {
      this.setState({
        zip: this.props.user.zip || '',
        start_year: this.props.user.start_year || '',
        gym: this.props.user.gym || '',
        tr: this.props.user.tr || false,
        lead: this.props.user.lead || false,
        grade_low: this.props.user.grade_low || 0,
        grade_high: this.props.user.grade_high || 0,
        about: this.props.user.about || '',
      });
    }
  };

  populateGymSelect = () => {
    const { user } = this.props;
    const radiusInMiles = 20;
    return gyms.filter(gym => {
        return zipcodes.distance(user.zip, gym.zip) < radiusInMiles;
      })
      .sort((gymA, gymB) => {
        const distA = zipcodes.distance(user.zip, gymA.zip);
        const distB = zipcodes.distance(user.zip, gymB.zip);
        return distA - distB;
      })
      .map((gym, i) => {
        return <option key={ i } value={ gym.id }>{ gym.name }</option>
      });
  }

  submitEdits = async () => {
    const { isEditing, isSubmitting, ...editBody } = this.state;
    const {
      token,
      user,
      matches,
      fetchUser,
      fetchMatches,
      clearMatches,
    } = this.props;
    this.setState({ isSubmitting: true });
    if (matches.length && !editBody.zip) clearMatches();
    const response = await axios.patch(
      `${BaseURL}/users/${user.id}`,
      editBody,
      { headers: { token } }
    );
    if (response.status === 200) {
      this.setState({
        isEditing: false,
        isSubmitting: false
      });
      await fetchUser();
      fetchMatches();
    }
  };

  render() {
    return this.props.isActive ? (
      <div className="dashboard-form-container">
        <div className="dashboard-form">
          <div className="dashboard-form-item">
            <div className="dashboard-form-label">
              I climb at
            </div>
            <div className="dashboard-gym-input">
              <div className="select is-primary">
                <select
                  disabled={ !this.state.isEditing }
                  value={ this.state.gym }
                  onChange={ (e) => this.setState({ gym: parseInt(e.target.value, 10) }) }
                >
                  { this.populateGymSelect() }
                </select>
              </div>
            </div>
          </div>
          <div className="dashboard-form-item">
            <div className="dashboard-form-label">
              I like to
            </div>
            <div className={
              `tags dashboard-grade-tags ${
                this.state.isEditing ? 'grade-tag-is-white' : 'grade-tag-is-light'
            }` }>
              <span
                className={
                  `tag grade-tag is-medium ${this.state.isEditing ? 'is-white' : 'is-light'}`
                }
                onClick={ () => this.state.isEditing ?
                  this.setState({ tr: !this.state.tr }) : null
                }
              >
                { this.state.tr ? <FontAwesome name="check" /> : <span></span> }
                &nbsp;Toprope&nbsp;
              </span>
              <span
                className={
                  `tag grade-tag is-medium ${this.state.isEditing ?
                    'is-white' : 'is-light'}`
                }
                onClick={ () => this.state.isEditing ?
                  this.setState({ lead: !this.state.lead }) : null
                }
              >
                { this.state.lead ? <FontAwesome name="check" /> : <span></span> }
                &nbsp;Lead&nbsp;
              </span>
            </div>
          </div>
          <div className="dashboard-form-item">
            <div className="dashboard-form-label">
              ... from
            </div>
            <div className="dashboard-grade-select">
              <div className="select is-primary">
                <select
                  disabled={ !this.state.isEditing }
                  value={ this.state.grade_low }
                  onChange={ (e) => this.setState({ grade_low: parseInt(e.target.value, 10) }) }
                >
                  <option value={0}>5.7</option>
                  <option value={1}>5.8</option>
                  <option value={2}>5.9</option>
                  <option value={3}>5.10a</option>
                  <option value={4}>5.10b</option>
                  <option value={5}>5.10c</option>
                  <option value={6}>5.10d</option>
                  <option value={7}>5.11a</option>
                  <option value={8}>5.11b</option>
                  <option value={9}>5.11c</option>
                  <option value={10}>5.11d</option>
                  <option value={11}>5.12a</option>
                  <option value={12}>5.12b</option>
                  <option value={13}>5.12c</option>
                  <option value={14}>5.12d</option>
                </select>
              </div>
            </div>
            <div className="dashboard-form-label-mid">
              to
            </div>
            <div className="dashboard-grade-select">
              <div className="select is-primary">
                <select
                  disabled={ !this.state.isEditing }
                  value={ this.state.grade_high }
                  onChange={ (e) => this.setState({ grade_high: parseInt(e.target.value, 10) }) }
                >
                  <option value={0}>5.7</option>
                  <option value={1}>5.8</option>
                  <option value={2}>5.9</option>
                  <option value={3}>5.10a</option>
                  <option value={4}>5.10b</option>
                  <option value={5}>5.10c</option>
                  <option value={6}>5.10d</option>
                  <option value={7}>5.11a</option>
                  <option value={8}>5.11b</option>
                  <option value={9}>5.11c</option>
                  <option value={10}>5.11d</option>
                  <option value={11}>5.12a</option>
                  <option value={12}>5.12b</option>
                  <option value={13}>5.12c</option>
                  <option value={14}>5.12d</option>
                </select>
              </div>
            </div>
          </div>
          <div className="dashboard-form-item">
            <div className="dashboard-about-input">
              <textarea
                className="textarea is-primary is-small"
                type="text"
                placeholder="About me ..."
                disabled={ !this.state.isEditing }
                value={ this.state.about }
                onChange={ (e) => this.setState({ about: e.target.value }) }
              />
            </div>
          </div>
          {
            this.state.isEditing ? (
              <div className="dashboard-edit-buttons">
                <div
                  className="button is-text"
                  onClick={ () => {
                    this.setState({ isEditing: false});
                    this.populateForm();
                  } }
                >
                  Cancel
                </div>
                <div
                  className={`button is-primary${
                    this.state.isSubmitting ? ' is-loading' : ''
                  }`}
                  onClick={ () => this.submitEdits() }
                >
                  Submit
                </div>
              </div>
            ) : (
              <div
                className="button is-primary dashboard-edit-info-button"
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
  token: state.token,
  user: state.user,
  matches: state.matches,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchUser,
  fetchMatches,
  clearMatches,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardEdit);
