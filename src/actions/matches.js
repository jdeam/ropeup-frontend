import axios from 'axios';
import { calculateScheduleMatch } from '../util/schedules';
const BaseURL = process.env.REACT_APP_BASE_URL;

export const FETCHING_MATCHES = 'FETCHING_MATCHES';
export const MATCHES_RECEIVED = 'MATCHES_RECEIVED';
export const FETCHING_MATCHES_CANCELED = 'FETCHING_MATCHES_CANCELED';

export function fetchMatches() {
  return async (dispatch, getState) => {
    const {
      token,
      user,
      schedule,
      isFetchingMatches
    } = getState();
    if (!token || !user.zip || !schedule) {
      return dispatch({
        type: FETCHING_MATCHES_CANCELED
      });
    }
    if (!isFetchingMatches) dispatch({
      type: FETCHING_MATCHES
    });
    const response = await axios.get(
      `${BaseURL}/users?zip=${user.zip}`, {
        headers: {
          token
        }
      }
    );
    const {
      users
    } = response.data;
    const matchesWithRating = users.map(user => {
        user.matchRating = calculateScheduleMatch(schedule, user.schedule);
        return user;
      })
      .filter(user => user.matchRating > 0)
      .sort((userA, userB) => {
        return userB.matchRating - userA.matchRating;
      });
    dispatch({
      type: MATCHES_RECEIVED,
      matches: matchesWithRating
    });
  };
}

export const MATCHES_CLEARED = 'MATCHES_CLEARED';

export function clearMatches() {
  return (dispatch) => {
    dispatch({
      type: MATCHES_CLEARED
    });
  };
}