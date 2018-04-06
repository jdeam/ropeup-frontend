import { combineReducers } from 'redux';
import {
  USER_LOGGED_IN,
  USER_INFO_RECEIVED
} from '../actions';

function user_id(state = null, action) {
  switch (action.type) {
    case USER_LOGGED_IN: {
      return action.user_id;
    }
    default:
      return state;
  }
}

function user_info(state = null, action) {
  switch (action.type) {
    case USER_INFO_RECEIVED: {
      return action.user_info;
    }
    default:
      return state;
  }
}

export default combineReducers({
  user_id,
  user_info
});
