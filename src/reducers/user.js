import {
  FETCHING_USER,
  FETCHING_USER_CANCELED,
  USER_RECEIVED,
  USER_IMAGE_UPDATED,
  USER_CLEARED,
  FETCHING_SCHEDULE,
  FETCHING_SCHEDULE_CANCELED,
  SCHEDULE_RECEIVED,
  SCHEDULE_CLEARED,
} from '../actions/user';

export function isFetchingUser(state = false, action) {
  switch (action.type) {
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

export function user(state = {}, action) {
  switch (action.type) {
    case USER_RECEIVED:
      return action.user;
    case USER_IMAGE_UPDATED:
      return { ...state,
        img_url: action.img_url
      };
    case USER_CLEARED:
      return {};
    default:
      return state;
  }
}

export function isFetchingSchedule(state = false, action) {
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

export function schedule(state = [], action) {
  switch (action.type) {
    case SCHEDULE_RECEIVED:
      return action.schedule;
    case SCHEDULE_CLEARED:
      return [];
    default:
      return state;
  }
}