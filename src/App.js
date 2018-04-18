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
          <Route path="/matches/:id" render={ (props) => (
            token && year && zip ? <MatchDetail { ...props } /> :
            token ? <Redirect to="/welcome" /> : <Redirect to="/login" />
          ) } />
          <Route path="/matches" render={ (props) => (
            token && year && zip ? <MatchList { ...props } /> :
            token ? <Redirect to="/welcome" /> : <Redirect to="/login" />
          ) } />
          <Route path="/messages/:id" render={ (props) => (
            token && year && zip ? <MessageDetail { ...props } /> :
            token ? <Redirect to="/welcome" /> : <Redirect to="/login" />
          ) } />
          <Route path="/messages" render={ (props) => (
            token && year && zip ? <MessageList { ...props } /> :
            token ? <Redirect to="/welcome" /> : <Redirect to="/login" />
          ) } />
          <Route path="/login" render={ (props) => (
            token && year && zip ? <Redirect to="/dashboard" /> :
            token ? <Redirect to="/welcome" />: <Login { ...props } />
          ) } />
          <Route path="/signup" render={ (props) => (
            token && year && zip ? <Redirect to="/dashboard" /> :
            token ? <Redirect to="/welcome" />: <Signup { ...props } />
          ) } />
          <Route path="/welcome" render={ (props) => (
            token && year && zip ? <Redirect to="/dashboard" /> : 
            token ? <Welcome { ...props } /> : <Redirect to="/login" />
          ) } />
          <Route path="/" render={ () => (
            token && year && zip ? <Redirect to="/dashboard" /> :
            token ? <Redirect to="/welcome" /> : <Redirect to="/login" />
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
