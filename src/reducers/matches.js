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

export function matchesById(state = {}, action) {
  switch (action.type) {
    case MATCHES_RECEIVED:
      return action.matches.reduce((byId, match) => {
        const {
          id
        } = match;
        byId[id] = match;
        return byId;
      }, {});
    case MATCHES_CLEARED:
      return {};
    default:
      return state;
  }
}