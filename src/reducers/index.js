import { combineReducers } from 'redux';
import { emptySchedule, scheduleItemsToWeek } from '../util/schedules';
import {
  DASHBOARD_TAB_SWITCHED,
  DASHBOARD_TAB_RESET,
  TOKEN_RECEIVED,
  TOKEN_CLEARED,
  FETCHING_USER,
  FETCHING_USER_CANCELED,
  USER_RECEIVED,
  USER_CLEARED,
  FETCHING_SCHEDULE,
  FETCHING_SCHEDULE_CANCELED,
  SCHEDULE_RECEIVED,
  SCHEDULE_CLEARED,
  FETCHING_MATCHES,
  FETCHING_MATCHES_CANCELED,
  MATCHES_RECEIVED,
  MATCHES_CLEARED,
  SB_LOGIN_SUCCESS,
  SB_LOGOUT_SUCCESS,
  SB_CHANNELS_RECEIVED,
} from '../actions';

function dashboardTabInView(state = 'edit', action) {
  switch (action.type) {
    case DASHBOARD_TAB_SWITCHED:
      return action.tab;
    case DASHBOARD_TAB_RESET:
      return 'edit';
    default:
      return state;
  }
}

function token(state = '', action) {
  switch (action.type) {
    case TOKEN_RECEIVED:
      return action.token;
    case TOKEN_CLEARED:
      return '';
    default:
      return state;
  }
}

function fetchingUser(state = false, action) {
  switch(action.type) {
    case FETCHING_USER:
      return true;
    case USER_RECEIVED:
      return false;
    case FETCHING_USER_CANCELED:
      return false;
    default:
      return state;
  }
}

function user(state = {}, action) {
  switch (action.type) {
    case USER_RECEIVED:
      return action.user;
    case USER_CLEARED:
      return {};
    default:
      return state;
  }
}

function fetchingSchedule(state = false, action) {
  switch (action.type) {
    case FETCHING_SCHEDULE:
      return true;
    case SCHEDULE_RECEIVED:
      return false;
    case FETCHING_SCHEDULE_CANCELED:
      return false;
    default:
      return state;
  }
}

function schedule(state = [], action) {
  switch (action.type) {
    case SCHEDULE_RECEIVED:
      return action.schedule;
    case SCHEDULE_CLEARED:
      return [];
    default:
      return state;
  }
}

function scheduleByDay(state = [...emptySchedule], action) {
  switch (action.type) {
    case SCHEDULE_RECEIVED :
      return scheduleItemsToWeek(action.schedule);
    case SCHEDULE_CLEARED:
      return [...emptySchedule];
    default:
      return state;
  }
}

function fetchingMatches(state = false, action) {
  switch (action.type) {
    case FETCHING_MATCHES:
      return true;
    case MATCHES_RECEIVED:
      return false;
    case FETCHING_MATCHES_CANCELED:
      return false;
    default:
      return state;
  }
}

function matches(state = [], action) {
  switch (action.type) {
    case MATCHES_RECEIVED:
      return action.matches;
    case MATCHES_CLEARED:
      return [];
    default:
      return state;
  }
}

function matchesById(state = {}, action) {
  switch (action.type) {
    case MATCHES_RECEIVED:
      return action.matches.reduce((byId, match) => {
        const { id, ...matchWithoutId } = match;
        byId[id] = matchWithoutId;
        return byId;
      }, {});
    case MATCHES_CLEARED:
      return {};
    default:
      return state;
  }
}

function sbUser(state = null, action) {
  switch (action.type) {
    case SB_LOGIN_SUCCESS:
      return action.user;
    case SB_LOGOUT_SUCCESS:
      return null;
    default:
      return state;
  }
}

function sbChannels(state = [], action) {
  switch (action.type) {
    case SB_CHANNELS_RECEIVED:
      return action.channels;
    case SB_LOGOUT_SUCCESS:
      return [];
    default:
      return state;
  }
}

export default combineReducers({
  dashboardTabInView,
  token,
  fetchingUser,
  user,
  fetchingSchedule,
  schedule,
  scheduleByDay,
  fetchingMatches,
  matches,
  matchesById,
  sbUser,
  sbChannels,
});
