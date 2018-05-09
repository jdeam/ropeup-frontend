import {
  FETCHING_MATCHES,
  FETCHING_MATCHES_CANCELED,
  MATCHES_RECEIVED,
  MATCHES_CLEARED,
} from '../actions/matches';

export function isFetchingMatches(state = false, action) {
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

export function matches(state = [], action) {
  switch (action.type) {
    case MATCHES_RECEIVED:
      return action.matches;
    case MATCHES_CLEARED:
      return [];
    default:
      return state;
  }
}

export function matchesByUsername(state = {}, action) {
  switch (action.type) {
    case MATCHES_RECEIVED:
      return action.matches.reduce((byUsername, match) => {
        const { username } = match;
        byUsername[username] = match;
        return byUsername;
      }, {});
    case MATCHES_CLEARED:
      return {};
    default:
      return state;
  }
}