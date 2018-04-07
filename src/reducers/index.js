import { combineReducers } from 'redux';
import {
  USER_RECEIVED,
  USER_CLEARED,
  CLIMBERS_RECEIVED,
  CLIMBERS_CLEARED
} from '../actions';

function user(state = null, action) {
  switch (action.type) {
    case USER_RECEIVED: {
      return action.user;
    }
    case USER_CLEARED: {
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
    case CLIMBERS_CLEARED: {
      return [];
    }
    default:
      return state;
  }
}

export default combineReducers({
  user,
  climbers
});
