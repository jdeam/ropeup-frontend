import axios from 'axios';
import BaseURL from '../BaseURL';

export const USER_CLEARED = 'USER_CLEARED';
export const CLIMBERS_CLEARED = 'CLIMBERS_CLEARED';
export const SCHEDULE_CLEARED = 'SCHEDULE_CLEARED';
export function logout() {
  return (dispatch) => {
    dispatch({ type: USER_CLEARED });
    dispatch({ type: CLIMBERS_CLEARED });
    dispatch({ type: SCHEDULE_CLEARED });
  }
}

export const USER_RECEIVED = 'USER_RECEIVED';
export function fetchUser(token) {
  return async (dispatch) => {
    const response = await axios.get(
      `${BaseURL}/users/`,
      { headers: { token } }
    );
    const user = response.data.user;
    dispatch({ type: USER_RECEIVED, user });
    return user;
  }
}

export const CLIMBERS_RECEIVED = 'CLIMBERS_RECEIVED';
export function fetchClimbers(token, zip) {
  return async (dispatch, getState) => {
    const response = await axios.get(
      `${BaseURL}/users?zip=${zip}`,
      { headers: { token } }
    );
    const { user } = getState();
    const climbers = response.data.climbers.filter(climber => {
      return climber.id !== user.id;
    });
    dispatch({ type: CLIMBERS_RECEIVED, climbers });
  }
}

export const SCHEDULE_RECEIVED = 'SCHEDULE_RECEIVED';
export function fetchSchedule(token, id) {
  return async (dispatch) => {
    const response = await axios.get(
      `${BaseURL}/users/${id}/schedule`,
      { headers: { token } }
    );
    const schedule = response.data.schedule;
    dispatch({ type: SCHEDULE_RECEIVED, schedule });
  }
}
