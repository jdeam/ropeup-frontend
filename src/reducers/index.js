import { combineReducers } from 'redux';
import { USER_LOGGED_IN } from '../actions';

function user_id(state = null, action) {
  switch (action.type) {
    case USER_LOGGED_IN: {
      return action.user_id;
    }
    default:
      return state;
  }
}

export default combineReducers({
  user_id
});
