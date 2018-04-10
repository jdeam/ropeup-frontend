import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { fetchToken, fetchUser, fetchSchedule, fetchMatches } from './actions';
import registerServiceWorker from './registerServiceWorker';

store.dispatch(fetchToken())
  .then(() => store.dispatch(fetchUser()))
  .then(() => store.dispatch(fetchSchedule()))
  .then(() => store.dispatch(fetchMatches()));

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
