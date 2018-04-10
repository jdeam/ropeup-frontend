import axios from 'axios';
import { compareSchedules } from '../util/schedules';
const BaseURL = process.env.REACT_APP_BASE_URL;

export const TOKEN_RECEIVED = 'TOKEN_RECEIVED';
export function fetchToken() {
  return async (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) dispatch({ type: TOKEN_RECEIVED, token });
    return token;
  };
}

export const FETCHING_USER = 'FETCHING_USER';
export const USER_RECEIVED = 'USER_RECEIVED';
export function fetchUser() {
  return async (dispatch, getState) => {
    const { token } = getState();
    if (!token) return;
    dispatch({ type: FETCHING_USER });
    const response = await axios.get(
      `${BaseURL}/users/`,
      { headers: { token } }
    );
    const { user } = response.data;
    dispatch({ type: USER_RECEIVED, user });
    return user;
  };
}

export const FETCHING_SCHEDULE = 'FETCHING_SCHEDULE';
export const SCHEDULE_RECEIVED = 'SCHEDULE_RECEIVED';
export function fetchSchedule() {
  return async (dispatch, getState) => {
    const { token, user } = getState();
    if (!token || !user) return;
    dispatch({ type: FETCHING_SCHEDULE });
    const response = await axios.get(
      `${BaseURL}/users/${user.id}/schedule`,
      { headers: { token } }
    );
    const { schedule } = response.data;
    dispatch({ type: SCHEDULE_RECEIVED, schedule });
    return schedule;
  };
}

export const FETCHING_MATCHES = 'FETCHING_MATCHES';
export const MATCHES_RECEIVED = 'MATCHES_RECEIVED';
export function fetchMatches() {
  return async (dispatch, getState) => {
    const { token, user, schedule } = getState();
    if (!token || !user || !schedule) return;
    dispatch({ type: FETCHING_MATCHES });
    const response = await axios.get(
      `${BaseURL}/users?zip=${user.zip}`,
      { headers: { token } }
    );
    const { users } = response.data;
    const usersWithMatch = users.map(user => {
        user.match = compareSchedules(schedule, user.schedule);
        return user;
      })
      .filter(user => user.match > 0)
      .sort((userA, userB) => {
        return userB.match - userA.match;
      });
    dispatch({ type: MATCHES_RECEIVED, matches: usersWithMatch });
  };
}

export const TOKEN_CLEARED = 'TOKEN_CLEARED';
export const USER_CLEARED = 'USER_CLEARED';
export const SCHEDULE_CLEARED = 'SCHEDULE_CLEARED';
export const MATCHES_CLEARED = 'MATCHES_CLEARED';
export function logout() {
  return (dispatch) => {
    dispatch({ type: TOKEN_CLEARED });
    dispatch({ type: USER_CLEARED });
    dispatch({ type: SCHEDULE_CLEARED });
    dispatch({ type: MATCHES_CLEARED });
    localStorage.removeItem('token');
  }
}
