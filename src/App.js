import React from 'react';
import Navbar from './components/Navbar';
import Login from './components/LoginView';
import Signup from './components/SignupView';
import Welcome from './components/WelcomeView';
import Dashboard from './components/DashboardView';
import MatchDetail from './components/MatchDetailView';
import MatchList from './components/MatchListView';
import MessageDetail from './components/MessageDetailView';
import MessageList from './components/MessageListView';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import 'bulma/css/bulma.css';

const App = ({ token, zip, year }) => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/dashboard" render={ (props) => (
            token && year && zip ? <Dashboard { ...props } /> :
            token ? <Redirect to="/welcome" /> : <Redirect to="/login" />
          ) } />
          <Route path="/matches/:username" render={ (props) => (
            token ? <MatchDetail { ...props } /> : <Redirect to="/login" />
          ) } />
          <Route path="/matches" render={ (props) => (
            token ? <MatchList { ...props } /> : <Redirect to="/login" />
          ) } />
          <Route path="/messages/:username" render={ (props) => (
            token ? <MessageDetail { ...props } /> : <Redirect to="/login" />
          ) } />
          <Route path="/messages" render={ (props) => (
            token ? <MessageList { ...props } /> : <Redirect to="/login" />
          ) } />
          <Route path="/login" render={ (props) => (
            token ? <Redirect to="/dashboard" /> : <Login { ...props } />
          ) } />
          <Route path="/signup" render={ (props) => (
            token ? <Redirect to="/dashboard" /> : <Signup { ...props } />
          ) } />
          <Route path="/welcome" render={ (props) => (
            token && year && zip ? <Redirect to="/dashboard" /> :
            token ? <Welcome { ...props } /> : <Redirect to="/login" />
          ) } />
          <Route path="/" render={ () => (
            token ? <Redirect to="/dashboard" /> : <Redirect to="/login" />
          ) } />
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  token: state.token,
  zip: state.user.zip,
  year: state.user.start_year,
});

export default connect(
  mapStateToProps
)(App);
