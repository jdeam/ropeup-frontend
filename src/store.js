import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import { createLogger } from 'redux-logger';

const logger = createLogger({
  // predicate: (getState, action) => action.type.slice(0, 2) === 'SB',
  collapsed: (getState, action, logEntry) => !logEntry.error,
});

const middlewares = [ thunkMiddleware ];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middlewares)
  )
);

export default store;
