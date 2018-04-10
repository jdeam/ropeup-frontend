import React from 'react';
import Navbar from './components/Navbar';
import Login from './components/LoginView';
import Signup from './components/SignupView';
import Dashboard from './components/DashboardView';
import MatchList from './components/MatchListView';
import MatchDetail from './components/MatchDetailView';
import ChatList from './components/ChatListView';
import ChatDetail from './components/ChatDetailView';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import 'bulma/css/bulma.css';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/signup" component={ Signup } />
          <Route path="/dashboard" component={ Dashboard } />
          <Route path="/matches/:id" component={ MatchDetail } />
          <Route path="/matches" component={ MatchList } />
          <Route path="/chat/:id" component={ ChatDetail } />
          <Route path="/chat" componenent={ ChatList } />
          <Route path="/" component={ Login } />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
