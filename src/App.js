import React from 'react';
import Navbar from './components/Navbar';
import Login from './components/LoginView';
import Signup from './components/SignupView';
import Dashboard from './components/DashboardView';
import MatchDetail from './components/MatchDetailView';
import MatchList from './components/MatchListView';
import ChatDetail from './components/ChatDetailView';
import ChatList from './components/ChatListView';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import 'bulma/css/bulma.css';

const App = ({ token }) => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" render={ () => (
            token ? <Redirect to="/dashboard" /> : <Redirect to="/login" />
          ) } />
          <Route path="/login" render={ (props) => (
            token ? <Redirect to="/dashboard" /> : <Login { ...props } />
          ) } />
          <Route path="/signup" render={ (props) => (
            token ? <Redirect to="/dashboard" /> : <Signup { ...props } />
          ) } />
          <Route path="/dashboard" render={ (props) => (
            token ? <Dashboard { ...props } /> : <Redirect to="/login" />
          ) } />
          <Route path="/matches/:id" render={ (props) => (
            token ? <MatchDetail { ...props } /> : <Redirect to="/login" />
          ) } />
          <Route path="/matches" render={ (props) => (
            token ? <MatchList { ...props } /> : <Redirect to="/login" />
          ) } />
          <Route path="/chat/:id" render={ (props) => (
            token ? <ChatDetail { ...props } /> : <Redirect to="/login" />
          ) } />
          <Route path="/chat" render={ (props) => (
            token ? <ChatList { ...props } /> : <Redirect to="/login" />
          ) } />
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  token: state.token
});

export default connect(
  mapStateToProps
)(App);
