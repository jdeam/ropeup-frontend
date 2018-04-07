import React from 'react';
import Navbar from './components/Navbar';
import Login from './components/LoginView';
import Signup from './components/SignupView';
import Dashboard from './components/DashboardView';
import ClimberList from './components/ClimberListView';
import ClimberDetail from './components/ClimberDetailView';
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
          <Route path="/climbers/:id" component={ ClimberDetail } />
          <Route path="/climbers" component={ ClimberList } />
          <Route path="/chat/:id" component={ ChatDetail } />
          <Route path="/chat" componenent={ ChatList } />
          <Route path="/" component={ Login } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
