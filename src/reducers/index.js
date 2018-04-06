import { combineReducers } from 'redux';
import {
  USER_INFO_RECEIVED,
  USER_INFO_CLEARED,
  CLIMBERS_RECEIVED
} from '../actions';

function user_info(state = null, action) {
  switch (action.type) {
    case USER_INFO_RECEIVED: {
      return action.user_info;
    }
    case USER_INFO_CLEARED: {
      return null;
    }
    default:
      return state;
  }
}

function climbers(state = [], action) {
  switch (action.type) {
    case CLIMBERS_RECEIVED: {
      return action.climbers;
    }
    default:
      return state;
  }
}

export default combineReducers({
  user_info
});
