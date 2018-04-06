import React from 'react';
import Header from './components/Header';
import Login from './components/LoginView';
import Signup from './components/SignupView';
import Dashboard from './components/DashboardView';
import ClimberList from './components/ClimberListView';
import ClimberDetail from './components/ClimberDetailView';
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
        <Header />
        <Switch>
          <Route path="/login" component={ Login } />
          <Route path="/signup" component={ Signup } />
          <Route path="/dashboard" component={ Dashboard } />
          <Route path="/climbers" component={ ClimberList } />
          <Route path="/climbers/:id" component={ ClimberDetail } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
