import { combineReducers } from 'redux';
import { USER_INFO_RECEIVED } from '../actions';

function user(state = null, action) {
  switch (action.type) {
    case USER_INFO_RECEIVED: {
      return action.user;
    }
    default:
      return state;
  }
}

export default combineReducers({
  user
});
