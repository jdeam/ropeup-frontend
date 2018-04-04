import React from 'react';
// import Header from './components/Header';
// import Footer from './components/Footer';
import Login from './components/LoginView';
import Signup from './components/SignupView';
import Dashboard from './components/DashboardView';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import 'bulma/css/bulma.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* <Header /> */}
        <Switch>
          <Route path="/login" component={ Login } />
          <Route path="/signup" component={ Signup } />
          <Route path="/dashboard" component= { Dashboard } />
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
