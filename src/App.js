import React from 'react';
// import Header from './components/Header';
import LoginView from './components/LoginView';
import SignupView from './components/SignupView';
// import Footer from './components/Footer';
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
        {/* <Header /> */}
        <Switch>
          <Route path="/login" component={ LoginView } />
          <Route path="/signup" component={ SignupView } />
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
