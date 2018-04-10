import { combineReducers } from 'redux';
import { createEmptySchedule, scheduleItemsToWeek } from '../util/schedules';
import {
  TOKEN_RECEIVED,
  TOKEN_CLEARED,
  USER_RECEIVED,
  USER_CLEARED,
  MATCHES_RECEIVED,
  MATCHES_CLEARED,
  SCHEDULE_RECEIVED,
  SCHEDULE_CLEARED
} from '../actions';

function token(state = '', action) {
  switch (action.type) {
    case TOKEN_RECEIVED: {
      return action.token;
    }
    case TOKEN_CLEARED: {
      return '';
    }
    default:
      return state;
  }
}

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

function schedule(state = [], action) {
  switch (action.type) {
    case SCHEDULE_RECEIVED: {
      return action.schedule;
    }
    case SCHEDULE_CLEARED: {
      return [];
    }
    default:
      return state;
  }
}

function scheduleByDay(state = createEmptySchedule(), action) {
  switch (action.type) {
    case SCHEDULE_RECEIVED : {
      return scheduleItemsToWeek(action.schedule);
    }
    case SCHEDULE_CLEARED: {
      return createEmptySchedule();
    }
    default:
      return state;
  }
}

function matches(state = [], action) {
  switch (action.type) {
    case MATCHES_RECEIVED: {
      return action.matches;
    }
    case MATCHES_CLEARED: {
      return [];
    }
    default:
      return state;
  }
}

function matchesById(state = {}, action) {
  switch (action.type) {
    case MATCHES_RECEIVED: {
      return action.matches.reduce((byId, match) => {
        const { id, ...matchWithoutId } = match;
        byId[id] = matchWithoutId;
        return byId;
      }, {});
    }
    case MATCHES_CLEARED: {
      return {};
    }
    default:
      return state;
  }
}

export default combineReducers({
  token,
  user,
  schedule,
  scheduleByDay,
  matches,
  matchesById
});
