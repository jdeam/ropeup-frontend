import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { fetchAllUserInfo } from './actions';
import registerServiceWorker from './registerServiceWorker';

store.dispatch(fetchAllUserInfo());

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
